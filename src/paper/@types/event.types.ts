import { Point, Path } from "./item.types";

export enum PaperViewEvents {
  ITEM_ADDED = "event::item-added",
  LAYER_ADDED = "event::layer-added",
  SEGMENT_ADDED = "event::segment-added",
}

export interface ItemAddedEvent {
  id: string;
  data: string;
}

export interface LayerAddedEvent extends ItemAddedEvent {}

export interface SegmentAddedEvent {
  layerID: string;
  groupID?: Nullable<string>;
  itemID: string;
  point: Point;
  path: Path;
}
