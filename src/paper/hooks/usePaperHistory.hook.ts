import { compress, decompress } from "lz-string";
import paper from "paper";
import { useCallback } from "react";
import useUndo from "use-undo";
import { DEBUG } from "../../constants";
import {
  AddToHistoryEvent,
  PaperViewEvents,
  RedoHistoryEvent,
  UndoHistoryEvent,
} from "../@types";
import { emitOnView } from "../helper";
import { usePaperEvent } from "./usePaperEvent.hook";

enum HistoryAction {
  UNDO = "UNDO",
  REDO = "REDO",
}

enum HistoryItemAction {
  ADD = "ADD",
  DELETE = "DELETE",
}
interface HistoryItemData {
  id: string;
  data: string;
  action?: HistoryItemAction;
}

/**
 * usePaperHistory
 *
 * This hook can be used to enable the history functionality
 * for drawing actions (undo/redo). When specified PaperViewEvents
 * are emitted on the paper view, the callback functions
 * defined here will be executed (see usePaperEvent hook).
 *
 * It stores all states we need.
 * To operate on this state, there are three functions in actions
 * (set, undo and redo) that dispatch defined types and necessary value.
 *
 * To compress the data of a drawing action the package "lz-string"
 * is used. This should be considered as an optimization.
 *
 * The callbacks defined in this hook should be
 * self-explanatory due to the naming.
 *
 * @export
 * @return {undo, redo, canUndo, canRedo, resetHistory}
 */
export function usePaperHistory() {
  const [paperHistory, { set, undo, redo, canUndo, canRedo, reset }] = useUndo<
    Nullable<HistoryItemData>
  >(null);

  const importHistoryItem = useCallback((historyItem: HistoryItemData) => {
    const decompressedData = decompress(historyItem.data);

    if (decompressedData) {
      const item = paper.project.activeLayer.importJSON(decompressedData);

      if (item) {
        emitOnView<RedoHistoryEvent>(PaperViewEvents.REDO_HISTORY, {
          id: item.name,
          data: decompressedData,
        });
      }
    }
  }, []);

  const deleteHistoryItem = useCallback((historyItem: HistoryItemData) => {
    const item = paper.project.getItem({ name: historyItem.id });

    if (item) {
      emitOnView<UndoHistoryEvent>(PaperViewEvents.UNDO_HISTORY, {
        id: item.name,
      });

      item.remove();
    }
  }, []);

  const performHistoryAction = useCallback(
    (historyItem: HistoryItemData, historyAction: HistoryAction) => {
      const action = historyItem.action || historyAction;

      switch (action) {
        case HistoryAction.REDO:
        case HistoryItemAction.ADD: {
          importHistoryItem(historyItem);
          break;
        }

        case HistoryAction.UNDO:
        case HistoryItemAction.DELETE: {
          deleteHistoryItem(historyItem);
          break;
        }
      }
    },
    [deleteHistoryItem, importHistoryItem]
  );

  const undoAddItem = useCallback(() => {
    if (canUndo) {
      const { present } = paperHistory;
      present && performHistoryAction(present, HistoryAction.UNDO);
      undo();
    }
  }, [canUndo, paperHistory, performHistoryAction, undo]);

  const redoAddItem = useCallback(() => {
    if (canRedo) {
      const { future } = paperHistory;
      const newPresent = future[0];
      newPresent && performHistoryAction(newPresent, HistoryAction.REDO);
      redo();
    }
  }, [canRedo, paperHistory, performHistoryAction, redo]);

  const addToHistory = useCallback(
    (item: HistoryItemData) => {
      const compressedData = compress(item.data);

      set({
        id: item.id,
        data: compressedData,
      });
    },
    [set]
  );

  usePaperEvent<AddToHistoryEvent>(
    PaperViewEvents.ADD_TO_HISTORY,
    (payload) => {
      if (canRedo) {
        paperHistory.future = [];
      }

      addToHistory(payload);
    }
  );

  usePaperEvent(PaperViewEvents.REVERT_HISTORY, () => {
    paperHistory.future = [...paperHistory.past].filter((i) => i);
    paperHistory.past = [];
    undo();
  });

  usePaperEvent(PaperViewEvents.RESET_HISTORY, () => {
    DEBUG && console.log("usePaperHistory -> RESET_HISTORY");
    reset(null);
  });

  return {
    undo: undoAddItem,
    redo: redoAddItem,
    canUndo,
    canRedo,
    resetHistory: () => reset(null),
  };
}
