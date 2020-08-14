import { Point, Path } from "./item.types";

export enum PaperViewEvents {
  // History Events
  ADD_TO_HISTORY = "event::add-to-history",

  // Item Events
  ITEM_ADDED = "event::item-added",
  LAYER_ADDED = "event::layer-added",
  SEGMENT_ADDED = "event::segment-added",
}

export interface ItemAddedEvent {
  id: string;
  data: string;
}

export interface LayerAddedEvent extends ItemAddedEvent {}

export interface AddToHistoryEvent extends ItemAddedEvent {}

export interface EmitSegmentAddedProps {
  item: paper.Item;
  point: paper.Point;
  pathOptions: Path;
  group?: paper.Group;
}
export interface SegmentAddedEvent {
  layerID: string;
  groupID?: Nullable<string>;
  itemID: string;
  point: Point;
  path: Path;
}
