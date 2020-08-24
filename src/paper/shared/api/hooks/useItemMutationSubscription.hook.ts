import { useSubscription } from "@apollo/client";
import { useEffect } from "react";
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

  const { data } = useSubscription<ItemMutated, ItemMutatedVariables>(
    ITEM_MUTATED,
    {
      variables: {
        userId,
        drawingName,
      },
    }
  );

  useEffect(() => {
    if (data) {
      const {
        itemMutated: { mutation, node },
      } = data;
      console.log("useItemMutationSubscription -> data", data);

      paperDrawingApiItemService.itemMutation(mutation, node);
    }
  }, [data]);
}
