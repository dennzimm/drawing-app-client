import { useSubscription } from "@apollo/client";
import { useParams } from "react-router";
import { useStoreState } from "../../store/hooks";
import {
  DrawingDataPublished,
  DrawingDataPublishedVariables,
} from "../@types/gql-operations.types";
import { DRAWING_DATA_PUBLISHED } from "../graphql/subscriptions/segment.subscriptions";

export function useDrawingDataPublished() {
  const { id: drawingID } = useParams();

  const userID = useStoreState((state) => state.user.userID);

  const drawingDataPublishedSubscription = useSubscription<
    DrawingDataPublished,
    DrawingDataPublishedVariables
  >(DRAWING_DATA_PUBLISHED, {
    variables: {
      drawingID,
      userID,
    },
  });

  return {
    ...drawingDataPublishedSubscription,
  };
}
