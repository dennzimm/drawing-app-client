import throttle from 'lodash.throttle';
import { useEffect, useRef } from 'react';
import { AddItemEvent, registerViewEvent } from '../helper/event.helper';
import { CustomViewEventsHookProps } from './useCustomViewEvents';

export function useAddItemEvent(props: CustomViewEventsHookProps) {
  const { ready, wait } = props;
  const eventsRegistered = useRef(false);

  const throttledAddItem = useRef(
    throttle((addItemData: AddItemEvent) => {
      console.log('event:add-item', addItemData);
    }, wait)
  );

  useEffect(() => {
    if (ready) {
      registerViewEvent('event:add-item', throttledAddItem.current);
      registerViewEvent(
        'event:add-item::flush',
        throttledAddItem.current.flush
      );

      eventsRegistered.current = true;
    }
  }, [ready]);

  return {
    eventsRegistered,
    throttledAddItem,
  };
}
