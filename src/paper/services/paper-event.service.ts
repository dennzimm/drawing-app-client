import {
  AddToHistoryEvent,
  EmitSegmentAddedProps,
  LayerAddedEvent,
  PaperViewEvents,
  SegmentAddedEvent,
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

  emitSegmentAdded(props: EmitSegmentAddedProps) {
    const { item, point, pathOptions, group } = props;

    const event: SegmentAddedEvent = {
      layerID: item.layer.name,
      groupID: (group && group.name) || undefined,
      itemID: item.name,
      point: {
        x: point.x,
        y: point.y,
      },
      path: {
        ...pathOptions,
      },
    };

    paperProvider.view.emit(PaperViewEvents.SEGMENT_ADDED, event);
  }
}

export const paperEventService = new PaperEventService();
