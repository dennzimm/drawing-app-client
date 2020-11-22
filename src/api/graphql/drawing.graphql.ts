import { gql } from "@apollo/client";
import {
  FragmentType,
  MutationOperationType,
  QueryOperationType,
} from "../@types/operation.types";

/**
 * These are GraphQL operations that are provided by the server's drawings module.
 * (DrawingResolver)
 */

export const DRAWING_MODEL_DATA_FRAGMENT: FragmentType = {
  name: "DrawingModelData",
  fragment: gql`
    fragment DrawingModelData on Drawing {
      id
      createdAt
      updatedAt
    }
  `,
};

export const DRAWING_DATA_FRAGMENT: FragmentType = {
  name: "DrawingData",
  fragment: gql`
    fragment DrawingData on Drawing {
      name
    }
  `,
};

export const DRAWING_ITEMS_FRAGMENT: FragmentType = {
  name: "DrawingItems",
  fragment: gql`
    fragment DrawingItems on Drawing {
      items {
        name
        type
        data
      }
    }
  `,
};

export const DRAWING: QueryOperationType = {
  name: "Drawing",
  query: gql`
    query Drawing($drawingName: String!) {
      drawing(drawingName: $drawingName) {
        ...DrawingData
        ...DrawingItems
      }
    }
    ${DRAWING_DATA_FRAGMENT.fragment}
    ${DRAWING_ITEMS_FRAGMENT.fragment}
  `,
};

export const DRAWINGS: QueryOperationType = {
  name: "Drawings",
  query: gql`
    query Drawings {
      drawings {
        ...DrawingModelData
        ...DrawingData
        ...DrawingItems
      }
    }
    ${DRAWING_DATA_FRAGMENT.fragment}
    ${DRAWING_ITEMS_FRAGMENT.fragment}
  `,
};

export const CREATE_DRAWING: MutationOperationType = {
  name: "CreateDrawing",
  mutation: gql`
    mutation CreateDrawing($data: CreateDrawingInput!) {
      createDrawing(data: $data) {
        id
      }
    }
  `,
};
