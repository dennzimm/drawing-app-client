import { gql } from "@apollo/client";

export const CREATE_ITEM = gql`
  mutation CreateItem($createItemData: CreateItemInput!) {
    createItem(createItemData: $createItemData) {
      id
    }
  }
`;
