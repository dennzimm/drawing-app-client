import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router";
import { fromEvent, Subscription } from "rxjs";
import {
  CreateItem,
  CreateItemVariables,
} from "../../../api/@types/generated/gql-operations.types";
import { CREATE_ITEM } from "../../../api/graphql/mutations";
import { ItemAddedEvent, PaperViewEvents } from "../../../paper/@types";
import { paperProvider } from "../../../paper/providers";
import { useStoreState } from "../../../store/hooks";

export function useAddItem() {
  const { id: drawingID } = useParams();

  const ready = useStoreState((state) => state.drawing.ready);
  const userID = useStoreState((state) => state.user.userID);

  const [createItem] = useMutation<CreateItem, CreateItemVariables>(
    CREATE_ITEM
  );

  useEffect(() => {
    let eventSubscription: Subscription;

    if (ready) {
      eventSubscription = fromEvent<ItemAddedEvent>(
        paperProvider.view,
        PaperViewEvents.ITEM_ADDED
      ).subscribe((payload) => {
        createItem({
          variables: {
            createItemData: {
              drawingID,
              userID,
              ...payload,
            },
          },
        });
      });
    }

    return () => {
      eventSubscription && eventSubscription.unsubscribe();
    };
  });
}
