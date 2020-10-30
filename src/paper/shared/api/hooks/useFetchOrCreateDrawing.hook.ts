import { useApolloClient, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
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
import { DEBUG } from "../../../../constants";
import { paperDrawingApiImportService } from "../services/paper-drawing-api-import.service";

/**
 * useFetchOrCreateDrawing
 *
 * This hook provides a triggerFetchOrCreateDrawing function
 * which is needed for creating or fetching a drawing.
 *
 * First a "drawing" query is executed. If no drawing with
 * the given name exists, the createDrawingMutation is executed.
 *
 * Otherwise the paperDrawingApiImportService will be called to
 * import the provided items data.
 *
 * @export
 * @param {string} drawingName
 * @return {loading, triggerFetchOrCreateDrawing}
 */
export function useFetchOrCreateDrawing(drawingName: string) {
  const [loading, setLoading] = useState(false);

  const [createDrawingMutation] = useMutation<
    CreateDrawing,
    CreateDrawingVariables
  >(CREATE_DRAWING.mutation);

  const client = useApolloClient();

  const triggerFetchOrCreateDrawing = useCallback(async () => {
    DEBUG && console.log("triggerFetchOrCreateDrawing");
    setLoading(true);

    try {
      const { data } = await client.query<DrawingType, DrawingVariablesType>({
        query: DRAWING.query,
        variables: {
          drawingName,
        },
      });

      if (!data || data.drawing === null) {
        createDrawingMutation({ variables: { data: { name: drawingName } } });
      } else {
        paperDrawingApiImportService.importItems(data.drawing.items);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [client, createDrawingMutation, drawingName]);

  return {
    loading,
    triggerFetchOrCreateDrawing,
  };
}
