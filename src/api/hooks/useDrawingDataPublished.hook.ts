import { useSubscription } from "@apollo/client";
import { useStoreState } from "../../store/hooks";
// import {
//   DrawingDataPublished,
//   DrawingDataPublishedVariables,
// } from "../@types/generated/gql-operations.types";
// import { DRAWING_DATA_PUBLISHED } from "../graphql/subscriptions";

export function useDrawingDataPublished(drawingID: string) {
  const userID = useStoreState((state) => state.user.userID);

  // const drawingDataPublishedSubscription = useSubscription<
  //   DrawingDataPublished,
  //   DrawingDataPublishedVariables
  // >(DRAWING_DATA_PUBLISHED, {
  //   variables: {
  //     drawingID,
  //     userID,
  //   },
  // });

  // return drawingDataPublishedSubscription;
}
