import { gql } from '@apollo/client';

export const ITEM_DATA_PUBLISHED = gql`
  subscription ItemDataPublished($userID: ID!, $drawingID: ID!) {
    itemDataPublished(userID: $userID, drawingID: $drawingID) {
      __typename
      ... on Segment {
        itemID
        segmentData {
          x
          y
        }
        strokeColor
        fillColor
        strokeWidth
      }
    }
  }
`;
