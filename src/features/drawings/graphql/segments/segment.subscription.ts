import { gql } from '@apollo/client';

export const NEW_SEGMENT_PUBLISHED = gql`
  subscription NewSegmentPublished($userID: ID!, $drawingID: ID!) {
    newSegmentPublished(userID: $userID, drawingID: $drawingID) {
      itemID
      segmentData
      strokeColor
      fillColor
      strokeWidth
    }
  }
`;
