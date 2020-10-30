import { useApolloClient } from "@apollo/client";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  DrawingActionPublished,
  DrawingActionPublishedVariables,
} from "../../../../api/@types/generated/gql-operations.types";
import { DRAWING_ACTION_PUBLISHED } from "../../../../api/graphql/drawing-action.graphql";
import { DEBUG } from "../../../../constants";
import { useStoreState } from "../../../../store/hooks";
import { paperDrawingApiImportService } from "../services";

/**
 * useDrawingActionSubscription
 *
 * This hook provides a subscribe function which executes all
 * needed drawing action published subscriptions.
 * Furthermore an unsubscribe function is provided.
 *
 * The importDrawingActionData function from the
 * paperDrawingApiImportService will be called when
 * new data is arrived.
 *
 * The required userId is retrieved from the store.
 *
 * @export
 * @param {string} drawingName
 * @return {data, subscribed, subscribe, unsubscribe}
 */
export function useDrawingActionSubscription(drawingName: string) {
  const { id: userId } = useStoreState((state) => state.user);

  const client = useApolloClient();

  const subscription = useRef<ZenObservable.Subscription>();
  const [data, setData] = useState<DrawingActionPublished>();

  const subscribe = useCallback(() => {
    const observer = client.subscribe<
      DrawingActionPublished,
      DrawingActionPublishedVariables
    >({
      query: DRAWING_ACTION_PUBLISHED.subscription,
      variables: {
        userId,
        drawingName,
      },
    });

    subscription.current = observer.subscribe(({ data }) => {
      if (data) {
        const {
          drawingActionPublished: { action, node },
        } = data;

        setData(data);
        paperDrawingApiImportService.importDrawingActionData(action, node);
      }
    });

    DEBUG &&
      console.log("subscribed DRAWING_ACTION_PUBLISHED -> id", drawingName);
  }, [client, drawingName, userId]);

  const unsubscribe = useCallback(() => {
    subscription.current && subscription.current.unsubscribe();

    DEBUG && console.log("unsubscribed DRAWING_ACTION_PUBLISHED");
  }, []);

  const subscribed = useMemo(
    () => subscription.current && !subscription.current.closed,
    []
  );

  return {
    data,
    subscribed,
    subscribe,
    unsubscribe,
  };
}
