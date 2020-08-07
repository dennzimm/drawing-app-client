import { paperProvider } from "../providers";

export enum LayerEvents {
  LAYER_ADDED = "event::layer-added",
}

export interface LayerAddedEvent {
  id: string;
  data: string;
}

export function emitLayerAdded(event: LayerAddedEvent) {
  paperProvider.view.emit(LayerEvents.LAYER_ADDED, event);
}
