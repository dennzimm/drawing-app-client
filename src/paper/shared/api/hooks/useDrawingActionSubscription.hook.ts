import { useSubscription } from "@apollo/client";
import { useEffect } from "react";
import {
  DrawingActionPublished,
  DrawingActionPublishedVariables,
} from "../../../../api/@types/generated/gql-operations.types";
import { DRAWING_ACTION_PUBLISHED } from "../../../../api/graphql/drawing-action.graphql";
import { useStoreState } from "../../../../store/hooks";
import { paperDrawingApiImportService } from "../services/paper-drawing-api-import.service";

export function useDrawingActionSubscription() {
  const userId = useStoreState((state) => state.user.userID);
  const drawingName = useStoreState((state) => state.drawing.id);

  const { data, loading, error } = useSubscription<
    DrawingActionPublished,
    DrawingActionPublishedVariables
  >(DRAWING_ACTION_PUBLISHED, {
    variables: {
      userId,
      drawingName,
    },
  });

  useEffect(() => {
    if (data) {
      const {
        drawingActionPublished: { action, node },
      } = data;

      paperDrawingApiImportService.importDrawingActionData(action, node);
    }
  }, [data, error, loading]);
}
