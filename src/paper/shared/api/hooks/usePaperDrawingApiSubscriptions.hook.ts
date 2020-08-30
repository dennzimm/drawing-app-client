import { useCallback } from "react";
import { useDrawingActionSubscription } from "./useDrawingActionSubscription.hook";
import { useItemMutationSubscription } from "./useItemMutationSubscription.hook";

export function usePaperDrawingApiSubscriptions(drawingName: string) {
  const {
    subscribe: subscribeDrawingAction,
    unsubscribe: unsubscribeDrawingAction,
  } = useDrawingActionSubscription(drawingName);

  const {
    subscribe: subscribeItemMutation,
    unsubscribe: unsubscribeItemMutation,
  } = useItemMutationSubscription(drawingName);

  const subscribeAll = useCallback(
    (drawingName: string) => {
      subscribeDrawingAction();
      subscribeItemMutation();
    },
    [subscribeDrawingAction, subscribeItemMutation]
  );

  const unsubscribeAll = useCallback(() => {
    unsubscribeDrawingAction();
    unsubscribeItemMutation();
  }, [unsubscribeDrawingAction, unsubscribeItemMutation]);

  return {
    subscribeAll,
    unsubscribeAll,
  };
}
