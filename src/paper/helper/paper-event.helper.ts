import { AddToHistoryEvent, PaperViewEvents } from "../@types";
import paper from "paper";

export const emitAddToHistory = (item: paper.Item) => {
  const event: AddToHistoryEvent = {
    id: item.name,
    data: item.exportJSON(),
  };

  paper.view.emit(PaperViewEvents.ADD_TO_HISTORY, event);
};
