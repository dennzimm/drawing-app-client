import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import {
  CreateDrawing,
  CreateDrawingVariables,
  Drawing as DrawingType,
  DrawingVariables as DrawingVariablesType,
} from "../../../../api/@types/generated/gql-operations.types";
import {
  CREATE_DRAWING,
  DRAWING,
} from "../../../../api/graphql/drawing.graphql";
import { useStoreState } from "../../../../store/hooks";
import { paperDrawingApiImportService } from "../services/paper-drawing-api-import.service";

export function useFetchOrCreateDrawing() {
  const drawingName = useStoreState((state) => state.drawing.id);

  const [
    getDrawing,
    { loading: getDrawingLoading, data: drawingData },
  ] = useLazyQuery<DrawingType, DrawingVariablesType>(DRAWING);

  const [createDrawing, { loading: createDrawingLoading }] = useMutation<
    CreateDrawing,
    CreateDrawingVariables
  >(CREATE_DRAWING);

  // Fetch drawing data
  useEffect(() => {
    getDrawing({
      variables: {
        drawingName,
      },
    });
  }, [drawingName, getDrawing]);

  useEffect(() => {
    // Create new drawing if not existing
    if (drawingData === null) {
      createDrawing({ variables: { data: { name: drawingName } } });
    } else if (drawingData && drawingData.drawing) {
      // Check if drawing data exists
      // If true: Import drawing items
      const {
        drawing: { items },
      } = drawingData;

      paperDrawingApiImportService.importItems(items);
    }
  });

  // Create new drawing if not existing
  useEffect(() => {
    if (drawingData === null) {
      createDrawing({ variables: { data: { name: drawingName } } });
    }
  }, [createDrawing, drawingData, drawingName]);

  return {
    getDrawingLoading,
    createDrawingLoading,
  };
}
