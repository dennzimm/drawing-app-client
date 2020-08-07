import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router";
import { fromEvent, Subscription } from "rxjs";
import {
  PublishNewSegment,
  PublishNewSegmentVariables,
} from "../../api/@types/gql-operations.types";
import { PUBLISH_NEW_SEGMENT } from "../../api/graphql/mutations";
import { useStoreState } from "../../store/hooks";
import { SegmentAddedEvent, SegmentEvents } from "../helper";
import { paperProvider } from "../providers";

export function usePublishNewSegment() {
  const { id: drawingID } = useParams();

  const ready = useStoreState((state) => state.drawing.ready);
  const userID = useStoreState((state) => state.user.userID);

  const [publishNewSegment] = useMutation<
    PublishNewSegment,
    PublishNewSegmentVariables
  >(PUBLISH_NEW_SEGMENT);

  useEffect(() => {
    let eventSubscription: Subscription;

    if (ready) {
      eventSubscription = fromEvent<SegmentAddedEvent>(
        paperProvider.view,
        SegmentEvents.SEGMENT_ADDED
      ).subscribe((payload) => {
        publishNewSegment({
          variables: {
            newSegmentData: {
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
  }, [drawingID, publishNewSegment, ready, userID]);
}
