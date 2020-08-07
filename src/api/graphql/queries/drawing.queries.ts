import { gql } from "@apollo/client";

export const GET_DRAWING = gql`
  query GetDrawing($id: ID!, $userID: ID!) {
    drawing(id: $id, userID: $userID) {
      items {
        data
      }
    }
  }
`;

export const GET_DRAWINGS = gql`
  query GetDrawings {
    drawings {
      id
      items {
        id
        data
      }
    }
  }
`;
