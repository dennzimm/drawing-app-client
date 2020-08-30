import { useMutation } from "@apollo/client";
import { useCallback, useEffect, useMemo } from "react";
import {
  CreateItem,
  CreateItemVariables,
  DeleteItem,
  DeleteItemVariables,
  DrawingNameInput,
  ItemType,
  UserIdInput,
} from "../../../../api/@types/generated/gql-operations.types";
import { CREATE_ITEM, DELETE_ITEM } from "../../../../api/graphql/item.graphql";
import { useStoreState } from "../../../../store/hooks";
import {
  PaperViewEvents,
  RedoHistoryEvent,
  UndoHistoryEvent,
} from "../../../@types";
import { usePaperEvent } from "../../../hooks";

interface CommonVariables {
  user: UserIdInput;
  drawing: DrawingNameInput;
}

export function usePaperHistoryApiEvents(drawingName: string) {
  const { id: userId } = useStoreState((state) => state.user);

  const commonVariables = useMemo<CommonVariables>(
    () => ({
      user: { userId },
      drawing: { drawingName },
    }),
    [drawingName, userId]
  );

  const [createItemMutation] = useMutation<CreateItem, CreateItemVariables>(
    CREATE_ITEM.mutation
  );
  const [deleteItemMutation] = useMutation<DeleteItem, DeleteItemVariables>(
    DELETE_ITEM.mutation
  );

  const { unsubscribeEvent: unsubscribeUndoEvent } = usePaperEvent<
    UndoHistoryEvent
  >(PaperViewEvents.UNDO_HISTORY, (payload) => {
    deleteItemMutation({
      variables: {
        ...commonVariables,
        data: {
          name: payload.id,
        },
      },
    });
  });

  const { unsubscribeEvent: unsubscribeRedoEvent } = usePaperEvent<
    RedoHistoryEvent
  >(PaperViewEvents.REDO_HISTORY, (payload) => {
    let type;

    try {
      const parsedData: [string, any] = JSON.parse(payload.data);
      const [paperItemType] = parsedData;
      type = ItemType[paperItemType.toUpperCase() as keyof typeof ItemType];
    } catch (err) {
      type = ItemType.PATH;
    }

    createItemMutation({
      variables: {
        ...commonVariables,
        data: {
          name: payload.id,
          type,
          data: payload.data,
        },
      },
    });
  });

  const unsubscribeAll = useCallback(() => {
    unsubscribeUndoEvent();
    unsubscribeRedoEvent();
  }, [unsubscribeRedoEvent, unsubscribeUndoEvent]);

  useEffect(() => {
    return unsubscribeAll;
  }, [unsubscribeAll]);

  return {
    unsubscribeAll,
  };
}
