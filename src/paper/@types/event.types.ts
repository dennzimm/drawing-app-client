export enum PaperViewEvents {
  // History Events
  ADD_TO_HISTORY = "event::add-to-history",
}

export interface ItemAddedEvent {
  id: string;
  data: string;
}

export interface AddToHistoryEvent extends ItemAddedEvent {}
