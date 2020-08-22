import paper from "paper";
import { useCallback, useEffect, useRef } from "react";
import { fromEvent, Subscription } from "rxjs";
import { PaperViewEvents } from "../@types";
import { usePaperReady } from "./usePaperReady.hook";

export function usePaperEvent<P>(
  event: PaperViewEvents,
  callback: (payload: P) => void
) {
  const { isReady } = usePaperReady();
  const eventSubscription = useRef<Subscription>();

  const unsubscribeEvent = useCallback(() => {
    if (eventSubscription.current) {
      eventSubscription.current.unsubscribe();
    }
  }, [eventSubscription]);

  useEffect(() => {
    if (isReady) {
      eventSubscription.current = fromEvent<P>(paper.view, event).subscribe(
        callback
      );
    }

    return unsubscribeEvent;
  }, [callback, event, isReady, unsubscribeEvent]);
}
