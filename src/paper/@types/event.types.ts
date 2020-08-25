export enum PaperViewEvents {
  // History Events
  ADD_TO_HISTORY = "event::add-to-history",
  UNDO_HISTORY = "event::undo-history",
  REDO_HISTORY = "event::redo-history",
  REVERT_HISTORY = "event::revert-history",
}

export interface ItemAddedEvent {
  id: string;
  data: string;
}

export interface AddToHistoryEvent extends ItemAddedEvent {}
export interface UndoHistoryEvent extends Pick<ItemAddedEvent, "id"> {}
export interface RedoHistoryEvent extends ItemAddedEvent {}
