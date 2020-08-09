import { gql } from "@apollo/client";

export const SegmentAddedPayloadFragment = gql`
  fragment SegmentAddedPayload on SegmentAdded {
    node {
      layerID
      groupID
      itemID
      point {
        x
        y
      }
      path {
        strokeWidth
        strokeColor
        strokeJoin
        strokeCap
      }
    }
  }
`;
