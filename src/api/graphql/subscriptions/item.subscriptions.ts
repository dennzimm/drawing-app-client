import { gql } from "@apollo/client";

export const ITEM_MUTATED = gql`
  subscription ItemMutated($userID: ID!, $drawingID: ID!) {
    itemMutated(userID: $userID, drawingID: $drawingID) {
      mutation
      node {
        id
        data
      }
    }
  }
`;
