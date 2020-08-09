import { gql } from "@apollo/client";
import { SegmentAddedPayloadFragment } from "../fragments";

export const DRAWING_DATA_PUBLISHED = gql`
  subscription DrawingDataPublished($userID: ID!, $drawingID: ID!) {
    drawingDataPublished(userID: $userID, drawingID: $drawingID) {
      __typename
      ...SegmentAddedPayload
    }
  }
  ${SegmentAddedPayloadFragment}
`;
