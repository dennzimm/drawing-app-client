import { useMutation } from "@apollo/client";
import { useCallback, useEffect, useMemo } from "react";
import {
  BrushDraw,
  BrushDrawInput,
  BrushDrawVariables,
  CreateItem,
  CreateItemInput,
  CreateItemVariables,
  DrawingNameInput,
  Erase,
  EraseInput,
  EraseVariables,
  PencilDraw,
  PencilDrawInput,
  PencilDrawVariables,
  UserIdInput,
} from "../../../../api/@types/generated/gql-operations.types";
import {
  BRUSH_DRAW,
  ERASE,
  PENCIL_DRAW,
} from "../../../../api/graphql/drawing-action.graphql";
import { CREATE_ITEM } from "../../../../api/graphql/item.graphql";
import { useStoreState } from "../../../../store/hooks";
import { PaperViewEvents } from "../../../@types";
import { usePaperEvent } from "../../../hooks";
import { usePaperHistoryApiEvents } from "./usePaperHistoryApiEvents.hook";

interface CommonVariables {
  user: UserIdInput;
  drawing: DrawingNameInput;
}

/**
 * usePaperDrawingApiEvents
 *
 * This hook uses usePaperEvent to connect the drawing events
 * emitted on the paper view with corresponding mutations.
 * These mutations are always executed when the corresponding
 * event is emitted on the paper view.
 *
 * As soon as this hook is executed, the paper view drawing events
 * are linked with the mutations.
 *
 * The "unsubscribeAll" function serves as cleanup and removes
 * the binding of the paper view drawing events to the mutations.
 *
 * The required userId is retrieved from the store.
 *
 * @export
 * @param {string} drawingName
 * @return {unsubscribeAll}
 */
export function usePaperDrawingApiEvents(drawingName: string) {
  const { id: userId } = useStoreState((state) => state.user);

  const {
    unsubscribeAll: unsubscribeAllHistoryEvents,
  } = usePaperHistoryApiEvents(drawingName);

  const commonVariables = useMemo<CommonVariables>(
    () => ({
      user: { userId },
      drawing: { drawingName },
    }),
    [drawingName, userId]
  );

  const [pencilDrawMutation] = useMutation<PencilDraw, PencilDrawVariables>(
    PENCIL_DRAW.mutation
  );
  const [brushDrawMutation] = useMutation<BrushDraw, BrushDrawVariables>(
    BRUSH_DRAW.mutation
  );
  const [eraseMutation] = useMutation<Erase, EraseVariables>(ERASE.mutation);
  const [createItemMutation] = useMutation<CreateItem, CreateItemVariables>(
    CREATE_ITEM.mutation
  );

  const { unsubscribeEvent: unsubscribePencilDrawEvent } = usePaperEvent<
    PencilDrawInput
  >(PaperViewEvents.PENCIL_DRAW, (data) => {
    pencilDrawMutation({
      variables: {
        ...commonVariables,
        data,
      },
    });
  });

  const { unsubscribeEvent: unsubscribeBrushDrawEvent } = usePaperEvent<
    BrushDrawInput
  >(PaperViewEvents.BRUSH_DRAW, (data) => {
    brushDrawMutation({
      variables: {
        ...commonVariables,
        data,
      },
    });
  });

  const { unsubscribeEvent: unsubscribeEraseEvent } = usePaperEvent<EraseInput>(
    PaperViewEvents.ERASE,
    (data) => {
      eraseMutation({
        variables: {
          ...commonVariables,
          data,
        },
      });
    }
  );

  const { unsubscribeEvent: unsubscribeCreateItemEvent } = usePaperEvent<
    CreateItemInput
  >(PaperViewEvents.CREATE_ITEM, (data) => {
    createItemMutation({
      variables: {
        ...commonVariables,
        data,
      },
    });
  });

  const unsubscribeAll = useCallback(() => {
    unsubscribeAllHistoryEvents();
    unsubscribePencilDrawEvent();
    unsubscribeBrushDrawEvent();
    unsubscribeEraseEvent();
    unsubscribeCreateItemEvent();
  }, [
    unsubscribeAllHistoryEvents,
    unsubscribeBrushDrawEvent,
    unsubscribeCreateItemEvent,
    unsubscribeEraseEvent,
    unsubscribePencilDrawEvent,
  ]);

  useEffect(() => {
    return unsubscribeAll;
  }, [unsubscribeAll]);

  return {
    unsubscribeAll,
  };
}
