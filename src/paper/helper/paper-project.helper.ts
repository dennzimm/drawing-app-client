import { nanoid } from "nanoid";
import {
  CreateGroupProps,
  CreateLayerProps,
  CreatePathProps,
  CreateRoundLinecapProps,
  ItemAddedEvent,
  LayerAddedEvent,
  PaperViewEvents,
  SegmentAddedEvent,
} from "../@types";
import { paperProvider } from "../providers";

class PaperProjectHelper {
  createLayer(props: CreateLayerProps = {}) {
    const { name = nanoid(), options = {} } = props;
    const layer = new paperProvider.scope.Layer({ name, ...options });

    return layer;
  }

  createGroup(props: CreateGroupProps = {}) {
    const { name = nanoid(), options = {} } = props;
    const group = new paperProvider.scope.Group({ name, ...options });

    return group;
  }

  createPath(props: CreatePathProps = {}) {
    const { name = nanoid(), options = {} } = props;
    const path = new paperProvider.scope.Path({ name, ...options });

    return path;
  }

  createRoundLinecap = (
    props: CreateRoundLinecapProps
  ): paper.Shape.Ellipse => {
    const { name = nanoid(), point, color, width } = props;

    const ellipse = new paperProvider.scope.Shape.Ellipse({
      name,
      strokeColor: color,
      fillColor: color,
      center: point,
      radius: width / 2,
    });

    return ellipse;
  };

  emitLayerAdded(event: LayerAddedEvent) {
    paperProvider.view.emit(PaperViewEvents.LAYER_ADDED, event);
  }

  emitItemAdded(event: ItemAddedEvent) {
    paperProvider.view.emit(PaperViewEvents.ITEM_ADDED, event);
  }

  emitSegmentAdded(event: SegmentAddedEvent) {
    paperProvider.view.emit(PaperViewEvents.SEGMENT_ADDED, event);
  }
}

export const paperProjectHelper = new PaperProjectHelper();
