import { useMutation } from "@apollo/client";
import { useParams } from "react-router";
import {
  PublishBrushDrawing,
  PublishBrushDrawingVariables,
  PublishEraseDrawing,
  PublishEraseDrawingVariables,
  PublishPencilDrawing,
  PublishPencilDrawingVariables,
} from "../../../api/@types/generated/gql-operations.types";
import {
  PUBLISH_BRUSH_DRAWING,
  PUBLISH_ERASE_DRAWING,
  PUBLISH_PENCIL_DRAWING,
} from "../../../api/graphql/mutations";
import {
  BrushDrawingEvent,
  EraseDrawingEvent,
  PaperViewEvents,
  PencilDrawingEvent,
} from "../../../paper/@types";
import { usePaperEvent } from "../../../paper/hooks";
import { useStoreState } from "../../../store/hooks";

export function useDrawingEvents() {
  const { id: drawingID } = useParams();
  const userID = useStoreState((state) => state.user.userID);

  const [publishPencilDrawing] = useMutation<
    PublishPencilDrawing,
    PublishPencilDrawingVariables
  >(PUBLISH_PENCIL_DRAWING);

  const [publishBrushDrawing] = useMutation<
    PublishBrushDrawing,
    PublishBrushDrawingVariables
  >(PUBLISH_BRUSH_DRAWING);

  const [publishEraseDrawing] = useMutation<
    PublishEraseDrawing,
    PublishEraseDrawingVariables
  >(PUBLISH_ERASE_DRAWING);

  usePaperEvent<PencilDrawingEvent>(
    PaperViewEvents.PENCIL_DRAWING,
    (payload) => {
      publishPencilDrawing({
        variables: {
          pencilDrawingData: {
            userID,
            drawingID,
            ...payload,
          },
        },
      });
    }
  );

  usePaperEvent<BrushDrawingEvent>(PaperViewEvents.BRUSH_DRAWING, (payload) => {
    publishBrushDrawing({
      variables: {
        brushDrawingData: {
          userID,
          drawingID,
          ...payload,
        },
      },
    });
  });

  usePaperEvent<EraseDrawingEvent>(PaperViewEvents.ERASE_DRAWING, (payload) => {
    publishEraseDrawing({
      variables: {
        eraseDrawingData: {
          userID,
          drawingID,
          ...payload,
        },
      },
    });
  });
}
