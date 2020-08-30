import paper, { Layer } from "paper";
import {
  ActionType,
  DrawingActionPublished_drawingActionPublished_node,
  DrawingActionPublished_drawingActionPublished_node_BrushDraw,
  DrawingActionPublished_drawingActionPublished_node_Erase,
  DrawingActionPublished_drawingActionPublished_node_PencilDraw,
  Drawing_drawing,
  ItemData,
  ItemType,
} from "../../../../api/@types/generated/gql-operations.types";
import {
  findLayer,
  findOrCreatePath,
} from "../../../helper/paper-project.helper";
import { brushTool } from "../../../tools/brush.tool";
import { eraserTool } from "../../../tools/eraser.tool";
import { pencilTool } from "../../../tools/pencil.tool";

interface CustomOptions {
  customPathOptions?: Record<string, unknown>;
}
class PaperDrawingApiImportService {
  importItems(items: Drawing_drawing["items"]) {
    items.forEach((item) => item && this.importItemData(item));
  }

  importItemData(itemData: ItemData) {
    switch (itemData.type) {
      case ItemType.PATH: {
        this.importPathItemData(itemData);
        break;
      }

      case ItemType.LAYER: {
        this.importPathItemData(itemData);
        break;
      }

      default: {
        break;
      }
    }
  }

  importPathItemData(itemData: ItemData) {
    const item = paper.project.getItem({ name: itemData.name });

    if (item) {
      item.importJSON(itemData.data);
    } else {
      paper.project.activeLayer.importJSON(itemData.data);
    }
  }

  importLayerItemData(itemData: ItemData) {
    const newLayer = new Layer({ insert: false }).importJSON(
      itemData.data
    ) as paper.Layer;

    paper.project.addLayer(newLayer);
  }

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

    pencilTool.handlePencilDraw({ path, point: new paper.Point(point) });
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

    brushTool.handleBrushDraw({
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
        blendMode: eraserTool.defaultBlendMode,
        strokeColor: eraserTool.defaultStrokeColor,
        strokeCap: eraserTool.defaultStrokeCap,
        strokeJoin: eraserTool.defaultStrokeJoin,
      },
    });

    eraserTool.handleErase({ path, point: new paper.Point(point) });
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
