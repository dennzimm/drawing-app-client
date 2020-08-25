import paper from "paper";
import { AddToHistoryEvent, PaperViewEvents } from "../@types";

export const emitOnView = <T extends object>(
  event: PaperViewEvents,
  payload: T
) => {
  paper.view.emit(event, payload);
};

export const emitAddToHistory = (item: paper.Item) => {
  const payload: AddToHistoryEvent = {
    id: item.name,
    data: item.exportJSON(),
  };

  emitOnView<AddToHistoryEvent>(PaperViewEvents.ADD_TO_HISTORY, payload);
};
