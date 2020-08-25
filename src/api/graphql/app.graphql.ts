import { gql } from "@apollo/client";
import { MutationOperationType } from "../@types/operation.types";

export const IS_ONLINE: MutationOperationType = {
  name: "IsOnline",
  mutation: gql`
    query IsOnline {
      isOnline
    }
  `,
};
