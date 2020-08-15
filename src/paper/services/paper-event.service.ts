import {
  AddToHistoryEvent,
  BrushDrawingEvent,
  CommonDrawingActionEventPayload,
  DrawingDataActionType,
  EmitDrawingActionProps,
  EraseDrawingEvent,
  LayerAddedEvent,
  PaperViewEvents,
  PencilDrawingEvent,
} from "../@types";
import { paperProvider } from "../providers";

class PaperEventService {
  emitAddToHistory(item: paper.Item) {
    const event: AddToHistoryEvent = {
      id: item.name,
      data: item.exportJSON(),
    };

    paperProvider.view.emit(PaperViewEvents.ADD_TO_HISTORY, event);
  }

  emitLayerAdded(layer: paper.Layer) {
    const event: LayerAddedEvent = {
      id: layer.name,
      data: layer.exportJSON(),
    };

    paperProvider.view.emit(PaperViewEvents.LAYER_ADDED, event);
  }

  emitItemAdded(item: paper.Item) {
    const event: AddToHistoryEvent = {
      id: item.name,
      data: item.exportJSON(),
    };

    paperProvider.view.emit(PaperViewEvents.ITEM_ADDED, event);
  }

  emitDrawingDataAction(props: EmitDrawingActionProps) {
    const {
      action,
      payload: { item, pathOptions, points, group },
    } = props;

    const commonEventPayload: CommonDrawingActionEventPayload = {
      layerID: item.layer.name,
      groupID: (group && group.name) || undefined,
      itemID: item.name,
      path: pathOptions,
    };

    switch (action) {
      case DrawingDataActionType.PENCIL_DRAWING: {
        paperProvider.view.emit(PaperViewEvents.PENCIL_DRAWING, {
          ...commonEventPayload,
          segment: {
            point: {
              x: points[0].x,
              y: points[0].y,
            },
          },
        } as PencilDrawingEvent);

        break;
      }
      case DrawingDataActionType.BRUSH_DRAWING: {
        paperProvider.view.emit(PaperViewEvents.BRUSH_DRAWING, {
          ...commonEventPayload,
          segments: points.reduce(
            (allPoints, point) => ({
              ...allPoints,
              point: { x: point.x, y: point.y },
            }),
            []
          ),
        } as BrushDrawingEvent);

        break;
      }
      case DrawingDataActionType.ERASE_DRAWING: {
        paperProvider.view.emit(PaperViewEvents.ERASE_DRAWING, {
          ...commonEventPayload,
          segment: {
            point: {
              x: points[0].x,
              y: points[0].y,
            },
          },
        } as EraseDrawingEvent);

        break;
      }

      default:
        break;
    }
  }
}

export const paperEventService = new PaperEventService();
