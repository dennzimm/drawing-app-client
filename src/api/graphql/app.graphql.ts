import { gql } from "@apollo/client";
import { MutationOperationType } from "../@types/operation.types";

/**
 * These are GraphQL operations that are provided by the server's app module.
 * (AppResolver)
 */

export const IS_ONLINE: MutationOperationType = {
  name: "IsOnline",
  mutation: gql`
    query IsOnline {
      isOnline
    }
  `,
};
