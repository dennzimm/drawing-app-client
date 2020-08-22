import { gql } from "@apollo/client";

export const IS_ONLINE = gql`
  query IsOnline {
    isOnline
  }
`;
