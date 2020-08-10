import { gql } from "@apollo/client";

export const CREATE_DRAWING = gql`
  mutation CreateDrawing($createDrawingData: CreateDrawingInput!) {
    createDrawing(createDrawingData: $createDrawingData) {
      id
    }
  }
`;

export const CREATE_OR_FIND_DRAWING = gql`
  mutation CreateOrFindDrawing($createDrawingData: CreateDrawingInput!) {
    createOrFindDrawing(createDrawingData: $createDrawingData) {
      id
      items {
        id
        data
      }
    }
  }
`;
