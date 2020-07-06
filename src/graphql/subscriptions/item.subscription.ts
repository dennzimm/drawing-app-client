import { gql } from '@apollo/client';

export const NEW_ITEM_DATA = gql`
  subscription OnNewItemData {
    newItemData {
      userID
      drawingID
      itemID
      data
    }
  }
`;

export const NEW_SEGMENT_DATA = gql`
  subscription OnNewSegmentData {
    newSegmentData {
      userID
      drawingID
      itemID
      data
    }
  }
`;
