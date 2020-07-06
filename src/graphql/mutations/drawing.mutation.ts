import { gql } from '@apollo/client';

export const CREATE_DRAWING = gql`
  mutation CreateDrawing($createDrawingInput: DrawingInput!) {
    createDrawing(createDrawingInput: $createDrawingInput) {
      drawingID
    }
  }
`;
