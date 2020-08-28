import { useApolloClient } from "@apollo/client";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ItemMutated,
  ItemMutatedVariables,
} from "../../../../api/@types/generated/gql-operations.types";
import { ITEM_MUTATED } from "../../../../api/graphql/item.graphql";
import { DEBUG } from "../../../../constants";
import { useStoreState } from "../../../../store/hooks";
import { paperDrawingApiItemService } from "../services/paper-drawing-api-item.service";

export function useItemMutationSubscription() {
  const userId = useStoreState((state) => state.user.userID);

  const client = useApolloClient();

  const subscription = useRef<ZenObservable.Subscription>();
  const [data, setData] = useState<ItemMutated>();

  const subscribe = useCallback(
    (drawingName: string) => {
      const observer = client.subscribe<ItemMutated, ItemMutatedVariables>({
        query: ITEM_MUTATED.subscription,
        variables: {
          userId,
          drawingName,
        },
      });

      subscription.current = observer.subscribe(({ data }) => {
        if (data) {
          const {
            itemMutated: { mutation, node },
          } = data;
          setData(data);
          paperDrawingApiItemService.itemMutation(mutation, node);
        }
      });

      DEBUG && console.log("subscribed ITEM_MUTATED");
    },
    [client, userId]
  );

  const unsubscribe = useCallback(() => {
    subscription.current && subscription.current.unsubscribe();

    DEBUG && console.log("unsubscribed ITEM_MUTATED");
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
