import throttle from 'lodash.throttle';
import { useEffect, useRef } from 'react';
import { AddSegmentEvent, registerViewEvent } from '../helper/event.helper';
import { CustomViewEventsHookProps } from './useCustomViewEvents';

export function useAddSegmentEvent(props: CustomViewEventsHookProps) {
  const { ready, wait } = props;
  const eventsRegistered = useRef(false);

  const throttledAddSegment = useRef(
    throttle((addItemData: AddSegmentEvent) => {
      console.log('event:add-segment', addItemData);
    }, wait)
  );

  useEffect(() => {
    if (ready) {
      registerViewEvent('event:add-segment', throttledAddSegment.current);
      registerViewEvent(
        'event:add-segment::flush',
        throttledAddSegment.current.flush
      );

      eventsRegistered.current = true;
    }
  }, [ready]);

  return {
    eventsRegistered,
    throttledAddSegment,
  };
}
