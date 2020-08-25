import { useLazyQuery, useMutation } from "@apollo/client";
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
  const [
    getDrawing,
    {
      loading: getDrawingLoading,
      error: getDrawingError,
      data: drawingData,
      called: getDrawingCalled,
    },
  ] = useLazyQuery<DrawingType, DrawingVariablesType>(DRAWING, {
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

  useEffect(() => {
    if (!getDrawingCalled || getDrawingLoading) {
      return;
    }

    if (!drawingData || drawingData.drawing === null) {
      createNewDrawing();
    } else {
      importDrawing(drawingData.drawing.items);
    }

    setLoading(false);
  }, [
    createNewDrawing,
    drawingData,
    getDrawingCalled,
    getDrawingLoading,
    importDrawing,
  ]);

  useEffect(() => {
    setLoading(true);

    if (getDrawingError || drawingData) {
      setLoading(false);
    }
  }, [drawingData, getDrawingError]);

  return {
    loading,
    triggerFetchOrCreateDrawing: getDrawing,
  };
}
