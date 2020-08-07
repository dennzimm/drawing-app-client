import { useEffect } from "react";
import { paperProvider } from "../../../paper/providers";
import { SegmentEvents, SegmentAddedEvent } from "../../../paper/helper";
import { useMutation } from "@apollo/client";
import { PUBLISH_NEW_SEGMENT, CREATE_ITEM } from "../../../graphql/mutations";
import {
  PublishNewSegment,
  PublishNewSegmentVariables,
  CreateItem,
  CreateItemVariables,
} from "../../../graphql/@types/gql-operations.types";
import { useStoreState } from "../../../store/hooks";

import { fromEvent, zip, interval, timer, from, of } from "rxjs";
import {
  map,
  delay,
  bufferTime,
  filter,
  reduce,
  concatMap,
  mergeMap,
  delayWhen,
} from "rxjs/operators";
import {
  LayerEvents,
  LayerAddedEvent,
} from "../../../paper/helper/layer.helper";

export function useDrawingCanvasEvents(ready: boolean) {
  const userID = useStoreState((state) => state.user.userID);

  const [publishNewSegment] = useMutation<
    PublishNewSegment,
    PublishNewSegmentVariables
  >(PUBLISH_NEW_SEGMENT);

  const [createItem] = useMutation<CreateItem, CreateItemVariables>(
    CREATE_ITEM
  );

  useEffect(() => {
    //   paperProvider.view.on(
    //     SegmentEvents.SEGMENT_ADDED,
    //     (event: SegmentAddedEvent) => {
    // publishNewSegment({
    //   variables: {
    //     newSegmentData: {
    //       drawingID: "1",
    //       userID,
    //       ...event,
    //     },
    //   },
    // });
    // }
    //   );
    if (ready) {
      fromEvent<SegmentAddedEvent>(
        paperProvider.view,
        SegmentEvents.SEGMENT_ADDED
      )
        // .pipe(concatMap((x) => of(x).pipe(delay(100))))
        .subscribe((ev) => {
          publishNewSegment({
            variables: {
              newSegmentData: {
                drawingID: "1",
                userID,
                ...ev,
              },
            },
          });
        });
      // zip(
      //   fromEvent<SegmentAddedEvent>(
      //     paperProvider.view,
      //     SegmentEvents.SEGMENT_ADDED
      //   ),
      //   interval(100)
      // )
      //   .pipe(map(([s, d]) => s))
      //   .subscribe((ev) => {
      // publishNewSegment({
      //   variables: {
      //     newSegmentData: {
      //       drawingID: "1",
      //       userID,
      //       ...ev,
      //     },
      //   },
      // });
      //     console.log(ev);
      //   });

      // fromEvent<LayerAddedEvent>(paperProvider.view, LayerEvents.LAYER_ADDED)
      //   .pipe(delay(100))
      //   .subscribe((e) => {
      //     // createItem({
      //     //   variables: {
      //     //     createItemData: {
      //     //       drawingID: "1",
      //     //       userID,
      //     //       ...e,
      //     //     },
      //     //   },
      //     console.log(e);
      //     // });
      //   });

      // paperProvider.view.on(
      //   LayerEvents.LAYER_ADDED,
      //   (event: LayerAddedEvent) => {
      //     console.log(event);
      //   }
      // );
    }
  }, [publishNewSegment, ready, userID]);
}
