import { gql } from "@apollo/client";

export const NewSegmentFragment = gql`
  fragment NewSegmentData on NewSegment {
    node {
      layerID
      groupID
      itemID
      strokeColor
      fillColor
      strokeWidth
      segmentData {
        x
        y
      }
    }
  }
`;

export const DRAWING_DATA_PUBLISHED = gql`
  subscription DrawingDataPublished($userID: ID!, $drawingID: ID!) {
    drawingDataPublished(userID: $userID, drawingID: $drawingID) {
      __typename
      ...NewSegmentData
    }
  }
  ${NewSegmentFragment}
`;
