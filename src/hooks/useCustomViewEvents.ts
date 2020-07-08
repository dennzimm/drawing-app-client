import { useRef } from 'react';
import { useAddItemEvent } from './useAddItemEvent';
import { useAddSegmentEvent } from './useAddSegmentEvent';

export interface CustomViewEventsHookProps {
  ready: boolean;
  wait?: number;
}

export function useCustomViewEvents(props: CustomViewEventsHookProps) {
  const { ready, wait = 250 } = props;

  const { eventsRegistered: addItemRegistered } = useAddItemEvent({
    ready,
    wait,
  });

  const { eventsRegistered: addSegmentRegistered } = useAddSegmentEvent({
    ready,
    wait,
  });

  const eventsRegistered = useRef(
    addItemRegistered.current && addSegmentRegistered.current
  );

  return {
    eventsRegistered,
  };
}
