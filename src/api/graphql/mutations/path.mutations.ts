import { gql } from "@apollo/client";

export const ADD_SEGMENT = gql`
  mutation AddSegment($segmentData: SegmentInput!) {
    addSegment(segmentData: $segmentData) {
      itemID
    }
  }
`;
