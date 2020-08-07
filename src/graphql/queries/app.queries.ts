import { gql } from "@apollo/client";

export const IS_SERVER_ONLINE = gql`
  query IsServerOnline {
    isOnline
  }
`;
