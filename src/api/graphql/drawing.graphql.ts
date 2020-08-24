import { gql } from "@apollo/client";
export default {};

export const DRAWING_MODEL_DATA_FRAGMENT = gql`
  fragment DrawingModelData on Drawing {
    id
    createdAt
    updatedAt
  }
`;

export const DRAWING_DATA_FRAGMENT = gql`
  fragment DrawingData on Drawing {
    name
  }
`;

export const DRAWING_ITEMS_FRAGMENT = gql`
  fragment DrawingItems on Drawing {
    items {
      name
      type
      data
    }
  }
`;

export const DRAWING = gql`
  query Drawing($drawingName: String!) {
    drawing(drawingName: $drawingName) {
      ...DrawingData
      ...DrawingItems
    }
  }
  ${DRAWING_DATA_FRAGMENT}
  ${DRAWING_ITEMS_FRAGMENT}
`;

export const DRAWINGS = gql`
  query Drawings {
    drawings {
      ...DrawingModelData
      ...DrawingData
      ...DrawingItems
    }
  }
  ${DRAWING_DATA_FRAGMENT}
  ${DRAWING_ITEMS_FRAGMENT}
`;

export const CREATE_DRAWING = gql`
  mutation CreateDrawing($data: CreateDrawingInput!) {
    createDrawing(data: $data) {
      id
    }
  }
`;
