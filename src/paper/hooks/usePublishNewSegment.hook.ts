import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router";
import { fromEvent, Subscription } from "rxjs";
import {
  AddSegment,
  AddSegmentVariables,
} from "../../api/@types/gql-operations.types";
import { ADD_SEGMENT } from "../../api/graphql/mutations";
import { useStoreState } from "../../store/hooks";
import { paperProvider } from "../providers";
import { SegmentAddedEvent, PaperViewEvents } from "../@types";

export function usePublishNewSegment() {
  const { id: drawingID } = useParams();

  const ready = useStoreState((state) => state.drawing.ready);
  const userID = useStoreState((state) => state.user.userID);

  const [addSegment] = useMutation<AddSegment, AddSegmentVariables>(
    ADD_SEGMENT
  );

  useEffect(() => {
    let eventSubscription: Subscription;

    if (ready) {
      eventSubscription = fromEvent<SegmentAddedEvent>(
        paperProvider.view,
        PaperViewEvents.SEGMENT_ADDED
      ).subscribe((payload) => {
        addSegment({
          variables: {
            segmentData: {
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
  }, [addSegment, drawingID, ready, userID]);
}
