import { useCallback } from "react";
import { useDrawingActionSubscription } from "./useDrawingActionSubscription.hook";
import { useItemMutationSubscription } from "./useItemMutationSubscription.hook";

/**
 * usePaperDrawingApiSubscriptions
 *
 * This hook returns two functions: subscribeAll and unsubscribeAll.
 * These functions are used to execute (or cleanup) all of the
 * GraphQL Subscriptions defined in the useDrawingActionSubscription
 * and useItemMutationSubscription hook.
 *
 * @export
 * @param {string} drawingName
 * @return {subscribeAll, unsubscribeAll}
 */
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
