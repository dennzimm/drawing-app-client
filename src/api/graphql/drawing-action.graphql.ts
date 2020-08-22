import { gql } from "@apollo/client";

export const POINT_COORDINATES_FRAGMENT = gql`
  fragment PointCoordinates on Point {
    x
    y
  }
`;

export const ALL_POINT_DATA_FRAGMENT = gql`
  fragment AllPointData on Point {
    x
    y
    angle
    angleInRadians
    length
    quadrant
  }
`;

export const PENCIL_DRAW_DATA_FRAGMENT = gql`
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
  ${POINT_COORDINATES_FRAGMENT}
`;

export const BRUSH_DRAW_DATA_FRAGMENT = gql`
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
  ${ALL_POINT_DATA_FRAGMENT}
  ${POINT_COORDINATES_FRAGMENT}
`;

export const ERASE_DATA_FRAGMENT = gql`
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
  ${POINT_COORDINATES_FRAGMENT}
`;

export const PENCIL_DRAW = gql`
  mutation PencilDraw(
    $user: UserIdInput!
    $drawing: DrawingNameInput!
    $data: PencilDrawInput!
  ) {
    pencilDraw(user: $user, drawing: $drawing, data: $data)
  }
`;

export const BRUSH_DRAW = gql`
  mutation BrushDraw(
    $user: UserIdInput!
    $drawing: DrawingNameInput!
    $data: BrushDrawInput!
  ) {
    brushDraw(user: $user, drawing: $drawing, data: $data)
  }
`;

export const ERASE = gql`
  mutation Erase(
    $user: UserIdInput!
    $drawing: DrawingNameInput!
    $data: EraseInput!
  ) {
    erase(user: $user, drawing: $drawing, data: $data)
  }
`;

export const DRAWING_ACTION_PUBLISHED = gql`
  subscription DrawingActionPublished($userId: String!, $drawingName: String!) {
    drawingActionPublished(userId: $userId, drawingName: $drawingName) {
      action
      node {
        ...PencilDrawData
        ...BrushDrawData
        ...EraseData
      }
    }
  }
  ${PENCIL_DRAW_DATA_FRAGMENT}
  ${BRUSH_DRAW_DATA_FRAGMENT}
  ${ERASE_DATA_FRAGMENT}
`;
