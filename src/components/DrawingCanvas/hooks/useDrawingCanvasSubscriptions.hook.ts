import { useSubscription } from "@apollo/client";
import { useEffect } from "react";
import {
  DrawingDataPublished,
  DrawingDataPublishedVariables,
} from "../../../graphql/@types/gql-operations.types";
import { DRAWING_DATA_PUBLISHED } from "../../../graphql/subscriptions/drawing.subscriptions";
import { useStoreState } from "../../../store/hooks";
import { handleSegmentAdded } from "../../../paper/helper";

export function useDrawingCanvasSubscriptions() {
  const userID = useStoreState((state) => state.user.userID);

  const { data } = useSubscription<
    DrawingDataPublished,
    DrawingDataPublishedVariables
  >(DRAWING_DATA_PUBLISHED, {
    variables: {
      drawingID: "1",
      userID,
    },
  });

  useEffect(() => {
    if (data) {
      const {
        drawingDataPublished: { __typename, node },
      } = data;

      if (node) {
        handleSegmentAdded(node);
      }
    }
  }, [data]);
}
