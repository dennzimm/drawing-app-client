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
import { logTime } from "../../../../helper/logging.helper";
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

/**
 * PaperDrawingApiImportService
 *
 * This service provides various methods to
 * import paper item data to be rendered on the drawing area.
 * An ActionType is used to decide which specific method
 * should be used  in order to import the data.
 *
 * For each ActionType there is a tool which has executed
 * or can execute this action. The methods of the individual
 * tool classes are reused in this service to import the given data
 * (handle___Draw()).
 *
 * In addition, various helper functions are executed to find
 * already existing items in order to correctly associate the given data.
 *
 * @class PaperDrawingApiImportService
 */
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
    logTime("completed importPathItemData at: ");
  }

  importLayerItemData(itemData: ItemData) {
    const newLayer = new Layer({ insert: false }).importJSON(
      itemData.data
    ) as paper.Layer;

    paper.project.addLayer(newLayer);
    logTime("completed importLayerItemData at: ");
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
    logTime("completed importPencilDrawData at: ");
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
    logTime("completed importBrushDrawData at: ");
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
    logTime("completed eraserTool at: ");
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
