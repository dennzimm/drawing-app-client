import { gql } from "@apollo/client";
import {
  FragmentType,
  MutationOperationType,
  SubscriptionOperationType,
} from "../@types/operation.types";

/**
 * These are GraphQL operations that are provided by the server's drawings module.
 * (ItemResolver)
 */

export const ITEM_DATA_FRAGMENT: FragmentType = {
  name: "ItemData",
  fragment: gql`
    fragment ItemData on Item {
      name
      type
      data
    }
  `,
};

export const CREATE_ITEM: MutationOperationType = {
  name: "CreateItem",
  mutation: gql`
    mutation CreateItem(
      $user: UserIdInput!
      $drawing: DrawingNameInput!
      $data: CreateItemInput!
    ) {
      createItem(user: $user, drawing: $drawing, data: $data) {
        id
      }
    }
  `,
};

export const DELETE_ITEM: MutationOperationType = {
  name: "DeleteItem",
  mutation: gql`
    mutation DeleteItem(
      $user: UserIdInput!
      $drawing: DrawingNameInput!
      $data: DeleteItemInput!
    ) {
      deleteItem(user: $user, drawing: $drawing, data: $data) {
        id
      }
    }
  `,
};

export const ITEM_MUTATED: SubscriptionOperationType = {
  name: "ItemMutated",
  subscription: gql`
    subscription ItemMutated($userId: String!, $drawingName: String!) {
      itemMutated(userId: $userId, drawingName: $drawingName) {
        mutation
        node {
          ...ItemData
        }
      }
    }
    ${ITEM_DATA_FRAGMENT.fragment}
  `,
};
