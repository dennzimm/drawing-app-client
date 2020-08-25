import { useApolloClient } from "@apollo/client";
import { useCallback, useRef, useState } from "react";
import {
  ItemMutated,
  ItemMutatedVariables,
} from "../../../../api/@types/generated/gql-operations.types";
import { ITEM_MUTATED } from "../../../../api/graphql/item.graphql";
import { useStoreState } from "../../../../store/hooks";
import { paperDrawingApiItemService } from "../services/paper-drawing-api-item.service";

export function useItemMutationSubscription() {
  const userId = useStoreState((state) => state.user.userID);
  const drawingName = useStoreState((state) => state.drawing.id);

  const client = useApolloClient();

  const subscription = useRef<ZenObservable.Subscription>();
  const [data, setData] = useState<ItemMutated>();

  const subscribe = useCallback(() => {
    const observer = client.subscribe<ItemMutated, ItemMutatedVariables>({
      query: ITEM_MUTATED.subscription,
      variables: {
        userId,
        drawingName,
      },
    });

    subscription.current = observer.subscribe(({ data }) => {
      console.log("ITEM_MUTATED received", data);

      if (data) {
        const {
          itemMutated: { mutation, node },
        } = data;
        console.log("useItemMutationSubscription -> data", data);

        setData(data);
        paperDrawingApiItemService.itemMutation(mutation, node);
      }
    });

    console.log("subscribed ITEM_MUTATED");
  }, [client, drawingName, userId]);

  const unsubscribe = useCallback(() => {
    subscription.current && subscription.current.unsubscribe();
    console.log("unsubscribed ITEM_MUTATED");
  }, []);

  return {
    data,
    subscribe,
    unsubscribe,
  };
}
