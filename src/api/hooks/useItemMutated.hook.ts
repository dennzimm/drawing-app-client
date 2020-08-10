import { useSubscription } from "@apollo/client";
import { useStoreState } from "../../store/hooks";
import {
  ItemMutated,
  ItemMutatedVariables,
} from "../@types/generated/gql-operations.types";
import { ITEM_MUTATED } from "../graphql/subscriptions";

export function useItemMutated(drawingID: string) {
  const userID = useStoreState((state) => state.user.userID);

  const itemMutatedSubscription = useSubscription<
    ItemMutated,
    ItemMutatedVariables
  >(ITEM_MUTATED, {
    variables: {
      drawingID,
      userID,
    },
  });

  return itemMutatedSubscription;
}
