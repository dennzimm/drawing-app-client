import { gql } from "@apollo/client";

export const CREATE_DRAWING = gql`
  mutation CreateDrawing($createDrawingData: CreateDrawingInput!) {
    createDrawing(createDrawingData: $createDrawingData) {
      id
    }
  }
`;
