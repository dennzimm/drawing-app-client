import { compress, decompress } from "lz-string";
import paper from "paper";
import { useCallback } from "react";
import useUndo from "use-undo";
import { AddToHistoryEvent, PaperViewEvents } from "../@types";
import { usePaperEvent } from "./usePaperEvent.hook";

interface HistoryItemData {
  id: string;
  data: string;
}

export function usePaperHistory() {
  const [paperHistory, { set, undo, redo, canUndo, canRedo }] = useUndo<
    Nullable<HistoryItemData>
  >(null);

  const undoAddItem = useCallback(() => {
    if (canUndo) {
      const { present } = paperHistory;

      if (present) {
        const item = paper.project.getItem({ name: present.id });
        item && item.remove();
      }

      undo();
    }
  }, [canUndo, paperHistory, undo]);

  const redoAddItem = useCallback(() => {
    if (canRedo) {
      const { future } = paperHistory;
      const newPresent = future[0];

      if (newPresent) {
        const decompressedData = decompress(newPresent.data);
        decompressedData &&
          paper.project.activeLayer.importJSON(decompressedData);
      }

      redo();
    }
  }, [canRedo, paperHistory, redo]);

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

  return {
    undoAddItem,
    redoAddItem,
    canUndo,
    canRedo,
  };
}
