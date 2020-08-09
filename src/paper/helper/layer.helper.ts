import { nanoid } from "nanoid";
import { CreateHelper, LayerAddedEvent, PaperViewEvents } from "../@types";
import { paperProvider } from "../providers";

export function emitLayerAdded(event: LayerAddedEvent) {
  paperProvider.view.emit(PaperViewEvents.LAYER_ADDED, event);
}

export const createLayer = (props: CreateHelper = {}) => {
  const { name = nanoid(), options = {} } = props;
  const layer = new paperProvider.scope.Layer({ name, ...options });

  return layer;
};
