import { gql } from '@apollo/client';

export const CREATE_ITEM = gql`
  mutation CreateItem($createItemInput: ItemInput!) {
    createItem(createItemInput: $createItemInput) {
      itemID
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($updateItemInput: ItemInput!) {
    updateItem(updateItemInput: $updateItemInput) {
      itemID
    }
  }
`;

export const ADD_SEGMENT = gql`
  mutation AddSegment($addSegmentInput: SegmentInput!) {
    addSegment(addSegmentInput: $addSegmentInput) {
      segmentID
    }
  }
`;
