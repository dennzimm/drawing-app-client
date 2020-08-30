export enum PaperViewEvents {
  // Item Events
  CREATE_ITEM = "event::create-item",

  // Tool Events
  PENCIL_DRAW = "event::pencil-draw",
  BRUSH_DRAW = "event::brush-draw",
  ERASE = "event::erase",

  // History Events
  ADD_TO_HISTORY = "event::add-to-history",
  UNDO_HISTORY = "event::undo-history",
  REDO_HISTORY = "event::redo-history",
  REVERT_HISTORY = "event::revert-history",
  RESET_HISTORY = "event::reset-history",
}

export interface ItemAddedEvent {
  id: string;
  data: string;
}

export interface AddToHistoryEvent extends ItemAddedEvent {}
export interface UndoHistoryEvent extends Pick<ItemAddedEvent, "id"> {}
export interface RedoHistoryEvent extends ItemAddedEvent {}
