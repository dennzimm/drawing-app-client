import { useApolloClient } from "@apollo/client";
import { useCallback, useRef, useState } from "react";
import {
  DrawingActionPublished,
  DrawingActionPublishedVariables,
} from "../../../../api/@types/generated/gql-operations.types";
import { DRAWING_ACTION_PUBLISHED } from "../../../../api/graphql/drawing-action.graphql";
import { useStoreState } from "../../../../store/hooks";
import { paperDrawingApiImportService } from "../services/paper-drawing-api-import.service";

export function useDrawingActionSubscription() {
  const userId = useStoreState((state) => state.user.userID);
  const drawingName = useStoreState((state) => state.drawing.id);

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
      console.log("DRAWING_ACTION_PUBLISHED received", data);

      if (data) {
        const {
          drawingActionPublished: { action, node },
        } = data;

        setData(data);
        paperDrawingApiImportService.importDrawingActionData(action, node);
      }
    });

    console.log("subscribed DRAWING_ACTION_PUBLISHED");
  }, [client, drawingName, userId]);

  const unsubscribe = useCallback(() => {
    subscription.current && subscription.current.unsubscribe();
    console.log("unsubscribed DRAWING_ACTION_PUBLISHED");
  }, []);

  return {
    data,
    subscribe,
    unsubscribe,
  };
}
