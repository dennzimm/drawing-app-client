import { gql } from "@apollo/client";
import {
  PencilDrawingPayloadFragment,
  BrushDrawingPayloadFragment,
  EraseDrawingPayloadFragment,
} from "../fragments";

export const DRAWING_DATA_PUBLISHED = gql`
  subscription DrawingDataPublished($userID: ID!, $drawingID: ID!) {
    drawingDataPublished(userID: $userID, drawingID: $drawingID) {
      action
      node {
        ... on PencilDrawing {
          ...PencilDrawingPayload
        }
        ... on BrushDrawing {
          ...BrushDrawingPayload
        }
        ... on EraseDrawing {
          ...EraseDrawingPayload
        }
      }
    }
  }
  ${PencilDrawingPayloadFragment}
  ${BrushDrawingPayloadFragment}
  ${EraseDrawingPayloadFragment}
`;
