import { gql } from "@apollo/client";

export const CREATE_ITEM = gql`
  mutation CreateItem($createItemData: CreateItemInput!) {
    createItem(createItemData: $createItemData) {
      id
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($userID: ID!, $drawingID: ID!, $itemID: ID!) {
    deleteItem(userID: $userID, drawingID: $drawingID, itemID: $itemID) {
      id
    }
  }
`;
