import { Point, Path, Segment } from "./item.types";
import { DrawingDataActionType } from "./action.types";

export enum PaperViewEvents {
  // History Events
  ADD_TO_HISTORY = "event::add-to-history",

  // Item Events
  ITEM_ADDED = "event::item-added",
  LAYER_ADDED = "event::layer-added",

  // Drawing Events
  PENCIL_DRAWING = "event::pencil-drawing",
  BRUSH_DRAWING = "event::brush-drawing",
  ERASE_DRAWING = "event::erase-drawing",
}

export interface ItemAddedEvent {
  id: string;
  data: string;
}

export interface LayerAddedEvent extends ItemAddedEvent {}

export interface AddToHistoryEvent extends ItemAddedEvent {}

export interface EmitDrawingActionProps {
  action: DrawingDataActionType;
  payload: {
    item: paper.Item;
    points: paper.Point[];
    pathOptions: Path;
    group?: paper.Group;
  };
}

export interface CommonDrawingActionEventPayload {
  layerID: string;
  groupID?: Nullable<string>;
  itemID: string;
  path: Path;
}

export interface PencilDrawingEvent extends CommonDrawingActionEventPayload {
  segment: Segment;
}

export interface BrushDrawingEvent extends CommonDrawingActionEventPayload {
  segments: Segment[];
}

export interface EraseDrawingEvent extends CommonDrawingActionEventPayload {
  segment: Segment;
}
