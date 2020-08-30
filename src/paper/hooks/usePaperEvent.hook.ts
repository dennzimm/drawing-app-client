import paper from "paper";
import { useCallback, useEffect, useRef } from "react";
import { fromEvent, Subscription } from "rxjs";
import { useStoreState } from "../../store/hooks";
import { PaperViewEvents } from "../@types";

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
