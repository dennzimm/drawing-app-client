import { gql } from "@apollo/client";
import {
  FragmentType,
  MutationOperationType,
  SubscriptionOperationType,
} from "../@types/operation.types";

export const POINT_COORDINATES_FRAGMENT: FragmentType = {
  name: "PointCoordinates",
  fragment: gql`
    fragment PointCoordinates on Point {
      x
      y
    }
  `,
};

export const ALL_POINT_DATA_FRAGMENT: FragmentType = {
  name: "AllPointData",
  fragment: gql`
    fragment AllPointData on Point {
      x
      y
      angle
      angleInRadians
      length
      quadrant
    }
  `,
};

export const PENCIL_DRAW_DATA_FRAGMENT: FragmentType = {
  name: "PencilDrawData",
  fragment: gql`
    fragment PencilDrawData on PencilDraw {
      layerID
      itemID
      point {
        ...PointCoordinates
      }
      path {
        strokeWidth
        strokeColor
      }
    }
    ${POINT_COORDINATES_FRAGMENT.fragment}
  `,
};

export const BRUSH_DRAW_DATA_FRAGMENT: FragmentType = {
  name: "BrushDrawData",
  fragment: gql`
    fragment BrushDrawData on BrushDraw {
      layerID
      itemID
      delta {
        ...AllPointData
      }
      middlePoint {
        ...AllPointData
      }
      singlePoint {
        ...PointCoordinates
      }
      path {
        strokeWidth
        fillColor
        closed
      }
    }
    ${ALL_POINT_DATA_FRAGMENT.fragment}
    ${POINT_COORDINATES_FRAGMENT.fragment}
  `,
};

export const ERASE_DATA_FRAGMENT: FragmentType = {
  name: "EraseData",
  fragment: gql`
    fragment EraseData on Erase {
      layerID
      itemID
      point {
        ...PointCoordinates
      }
      path {
        strokeWidth
      }
    }
    ${POINT_COORDINATES_FRAGMENT.fragment}
  `,
};

export const PENCIL_DRAW: MutationOperationType = {
  name: "PencilDraw",
  mutation: gql`
    mutation PencilDraw(
      $user: UserIdInput!
      $drawing: DrawingNameInput!
      $data: PencilDrawInput!
    ) {
      pencilDraw(user: $user, drawing: $drawing, data: $data)
    }
  `,
};

export const BRUSH_DRAW: MutationOperationType = {
  name: "BrushDraw",
  mutation: gql`
    mutation BrushDraw(
      $user: UserIdInput!
      $drawing: DrawingNameInput!
      $data: BrushDrawInput!
    ) {
      brushDraw(user: $user, drawing: $drawing, data: $data)
    }
  `,
};

export const ERASE: MutationOperationType = {
  name: "Erase",
  mutation: gql`
    mutation Erase(
      $user: UserIdInput!
      $drawing: DrawingNameInput!
      $data: EraseInput!
    ) {
      erase(user: $user, drawing: $drawing, data: $data)
    }
  `,
};

export const DRAWING_ACTION_PUBLISHED: SubscriptionOperationType = {
  name: "DrawingActionPublished",
  subscription: gql`
    subscription DrawingActionPublished(
      $userId: String!
      $drawingName: String!
    ) {
      drawingActionPublished(userId: $userId, drawingName: $drawingName) {
        action
        node {
          ...PencilDrawData
          ...BrushDrawData
          ...EraseData
        }
      }
    }
    ${PENCIL_DRAW_DATA_FRAGMENT.fragment}
    ${BRUSH_DRAW_DATA_FRAGMENT.fragment}
    ${ERASE_DATA_FRAGMENT.fragment}
  `,
};
