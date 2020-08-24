import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import {
  CreateDrawing,
  CreateDrawingVariables,
  Drawing as DrawingType,
  DrawingVariables as DrawingVariablesType,
  Drawing_drawing_items,
} from "../../../../api/@types/generated/gql-operations.types";
import {
  CREATE_DRAWING,
  DRAWING,
} from "../../../../api/graphql/drawing.graphql";
import { useStoreState } from "../../../../store/hooks";
import { paperDrawingApiImportService } from "../services/paper-drawing-api-import.service";

export function useFetchOrCreateDrawing() {
  const drawingName = useStoreState((state) => state.drawing.id);
  const [loading, setLoading] = useState(false);

  // Fetch drawing data
  const {
    loading: getDrawingLoading,
    error: getDrawingError,
    data: drawingData,
  } = useQuery<DrawingType, DrawingVariablesType>(DRAWING, {
    variables: {
      drawingName,
    },
  });

  const [createDrawingMutation] = useMutation<
    CreateDrawing,
    CreateDrawingVariables
  >(CREATE_DRAWING);

  const importDrawing = useCallback(
    (items: (Drawing_drawing_items | null)[]) => {
      paperDrawingApiImportService.importItems(items);
    },
    []
  );

  const createNewDrawing = useCallback(async () => {
    createDrawingMutation({ variables: { data: { name: drawingName } } });
  }, [createDrawingMutation, drawingName]);

  const fetchOrCreateDrawing = useCallback(async () => {
    if (!drawingData) {
      return;
    }

    if (drawingData.drawing !== null) {
      // Try to import drawing (items)
      await importDrawing(drawingData.drawing.items);
    } else {
      // Create new drawing if not existing
      await createNewDrawing();
    }
  }, [createNewDrawing, drawingData, importDrawing]);

  useEffect(() => {
    setLoading(true);

    // Return if drawingData is undefined
    if (getDrawingError || getDrawingLoading || !drawingData) {
      return;
    }

    try {
      fetchOrCreateDrawing();
    } finally {
      setLoading(false);
    }
  }, [drawingData, fetchOrCreateDrawing, getDrawingError, getDrawingLoading]);

  return {
    loading,
  };
}
