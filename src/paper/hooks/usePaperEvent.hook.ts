import paper from "paper";
import { useCallback, useEffect, useRef } from "react";
import { fromEvent, Subscription } from "rxjs";
import { useStoreState } from "../../store/hooks";
import { PaperViewEvents } from "../@types";

/**
 * usePaperEvent
 *
 * This hook can be used to link a specific PaperViewEvent
 * to a callback function (but only when a paper setup
 * (setupPaper() -> usePaper hook) has been executed).
 *
 * If the passed event is emitted on the paper view,
 * the callback function is executed.
 *
 * @export
 * @template P
 * @param {PaperViewEvents} event
 * @param {(payload: P) => void} callback
 * @return {unsubscribeEvent} A function to cancel the event subscription.
 */
export function usePaperEvent<P>(
  event: PaperViewEvents,
  callback: (payload: P) => void
) {
  const paperReady = useStoreState((state) => state.drawing.paperReady);

  const eventSubscription = useRef<Subscription>();

  const unsubscribeEvent = useCallback(() => {
    if (eventSubscription.current) {
      eventSubscription.current.unsubscribe();
    }
  }, [eventSubscription]);

  useEffect(() => {
    if (paperReady) {
      eventSubscription.current = fromEvent<P>(paper.view, event).subscribe(
        callback
      );
    } else {
      unsubscribeEvent();
    }

    return unsubscribeEvent;
  }, [callback, event, paperReady, unsubscribeEvent]);

  return {
    unsubscribeEvent,
  };
}
