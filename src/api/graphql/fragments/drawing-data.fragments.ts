import { gql } from "@apollo/client";

export const PencilDrawingPayloadFragment = gql`
  fragment PencilDrawingPayload on PencilDrawing {
    layerID
    itemID
    segment {
      point {
        x
        y
      }
    }
    path {
      strokeWidth
      strokeColor
      strokeJoin
      strokeCap
    }
  }
`;

export const BrushDrawingPayloadFragment = gql`
  fragment BrushDrawingPayload on BrushDrawing {
    layerID
    itemID
    segments {
      point {
        x
        y
      }
    }
    path {
      strokeWidth
      strokeColor
    }
  }
`;

export const EraseDrawingPayloadFragment = gql`
  fragment EraseDrawingPayload on EraseDrawing {
    layerID
    itemID
    segment {
      point {
        x
        y
      }
    }
    path {
      strokeWidth
    }
  }
`;
