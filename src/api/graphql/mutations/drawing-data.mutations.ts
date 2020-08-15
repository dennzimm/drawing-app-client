import { gql } from "@apollo/client";

export const PUBLISH_PENCIL_DRAWING = gql`
  mutation PublishPencilDrawing($pencilDrawingData: PencilDrawingInput!) {
    publishPencilDrawing(pencilDrawingData: $pencilDrawingData)
  }
`;

export const PUBLISH_BRUSH_DRAWING = gql`
  mutation PublishBrushDrawing($brushDrawingData: BrushDrawingInput!) {
    publishBrushDrawing(brushDrawingData: $brushDrawingData)
  }
`;

export const PUBLISH_ERASE_DRAWING = gql`
  mutation PublishEraseDrawing($eraseDrawingData: EraseDrawingInput!) {
    publishEraseDrawing(eraseDrawingData: $eraseDrawingData)
  }
`;
