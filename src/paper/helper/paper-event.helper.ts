import paper from "paper";
import { AddToHistoryEvent, PaperViewEvents } from "../@types";

/**
 * emitOnView
 *
 * Helper function to emit events (PaperViewEvents) on the paper view.
 *
 * @param event
 * @param payload
 */
export const emitOnView = <T extends object>(
  event: PaperViewEvents,
  payload: T
) => {
  paper.view.emit(event, payload);
};

/**
 * emitAddToHistory
 *
 * Helper function to emit an AddToHistory (PaperViewEvents.ADD_TO_HISTORY)
 * event on paper view.
 *
 * @param item
 */
export const emitAddToHistory = (item: paper.Item) => {
  const payload: AddToHistoryEvent = {
    id: item.name,
    data: item.exportJSON(),
  };

  emitOnView<AddToHistoryEvent>(PaperViewEvents.ADD_TO_HISTORY, payload);
};
