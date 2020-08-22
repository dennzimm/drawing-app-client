import paper from "paper";
import {
  ActionType,
  DrawingActionPublished_drawingActionPublished_node,
  DrawingActionPublished_drawingActionPublished_node_BrushDraw,
  DrawingActionPublished_drawingActionPublished_node_Erase,
  DrawingActionPublished_drawingActionPublished_node_PencilDraw,
} from "../../../../api/@types/generated/gql-operations.types";
import { BlendMode, StrokeCapType, StrokeJoinType } from "../../../@types";
import {
  findLayer,
  findOrCreatePath,
} from "../../../helper/paper-project.helper";
import {
  handleBrushDraw,
  handleErase,
  handlePencilDraw,
  pencilTool,
} from "../../../tools";

interface CustomOptions {
  customPathOptions?: Record<string, unknown>;
}
class PaperDrawingApiImportService {
  importDrawingActionData(
    action: ActionType,
    data: DrawingActionPublished_drawingActionPublished_node
  ) {
    switch (action) {
      case ActionType.PENCIL_DRAW: {
        this.importPencilDrawData(
          data as DrawingActionPublished_drawingActionPublished_node_PencilDraw
        );
        break;
      }
      case ActionType.BRUSH_DRAW: {
        this.importBrushDrawData(
          data as DrawingActionPublished_drawingActionPublished_node_BrushDraw
        );
        break;
      }
      case ActionType.ERASE: {
        this.importEraseData(
          data as DrawingActionPublished_drawingActionPublished_node_Erase
        );
        break;
      }

      default: {
        break;
      }
    }
  }

  importPencilDrawData(
    data: DrawingActionPublished_drawingActionPublished_node_PencilDraw
  ) {
    const { point } = data;

    const { path } = this.getItems(data, {
      customPathOptions: {
        strokeCap: pencilTool.defaultStrokeCap,
        strokeJoin: pencilTool.defaultStrokeJoin,
      },
    });

    handlePencilDraw({ path, point: new paper.Point(point) });
  }

  importBrushDrawData(
    data: DrawingActionPublished_drawingActionPublished_node_BrushDraw
  ) {
    const {
      delta,
      middlePoint,
      singlePoint,
      path: { strokeWidth },
    } = data;
    const { path } = this.getItems(data);

    handleBrushDraw({
      path,
      ...(delta && { delta: new paper.Point(delta) }),
      ...(middlePoint && { middlePoint: new paper.Point(middlePoint) }),
      ...(singlePoint && { singlePoint: new paper.Point(singlePoint) }),
      size: strokeWidth,
    });
  }

  importEraseData(
    data: DrawingActionPublished_drawingActionPublished_node_Erase
  ) {
    const { point } = data;
    const { path } = this.getItems(data, {
      customPathOptions: {
        blendMode: BlendMode.DESTINATION_OUT,
        strokeColor: "white",
        strokeCap: StrokeCapType.ROUND,
        strokeJoin: StrokeJoinType.ROUND,
      },
    });

    handleErase({ path, point: new paper.Point(point) });
  }

  private getItems(
    {
      layerID,
      itemID,
      path: pathOptions,
    }: DrawingActionPublished_drawingActionPublished_node,
    customOptions: CustomOptions = { customPathOptions: {} }
  ) {
    const layer = findLayer({ name: layerID });
    const path = findOrCreatePath({
      name: itemID,
      options: {
        layer: layer.name,
        ...pathOptions,
        ...customOptions.customPathOptions,
      },
    });

    return {
      layer,
      path,
    };
  }
}

export const paperDrawingApiImportService = new PaperDrawingApiImportService();
