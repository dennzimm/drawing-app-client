import { usePaperEvent } from "../../../hooks";
import {
  PaperViewEvents,
  UndoHistoryEvent,
  RedoHistoryEvent,
} from "../../../@types";
import { paperDrawingApiService } from "../services";
import { ItemType } from "../../../../api/@types/generated/gql-operations.types";

export function useHistroryApiActions() {
  usePaperEvent<UndoHistoryEvent>(PaperViewEvents.UNDO_HISTORY, (payload) => {
    paperDrawingApiService.deleteItem({ name: payload.id });
  });

  usePaperEvent<RedoHistoryEvent>(PaperViewEvents.REDO_HISTORY, (payload) => {
    let type;

    try {
      const parsedData: [string, any] = JSON.parse(payload.data);
      const [paperItemType] = parsedData;
      type = ItemType[paperItemType.toUpperCase() as keyof typeof ItemType];
    } catch (err) {
      type = ItemType.PATH;
    }

    paperDrawingApiService.createItem({
      name: payload.id,
      type,
      data: payload.data,
    });
  });
}
