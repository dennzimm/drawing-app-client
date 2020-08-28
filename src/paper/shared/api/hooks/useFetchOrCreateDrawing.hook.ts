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
import { paperDrawingApiImportService } from "../services/paper-drawing-api-import.service";

export function useFetchOrCreateDrawing() {
  const [loading, setLoading] = useState(false);

  const [createDrawingMutation] = useMutation<
    CreateDrawing,
    CreateDrawingVariables
  >(CREATE_DRAWING.mutation);

  const client = useApolloClient();

  const triggerFetchOrCreateDrawing = useCallback(
    async (drawingName: string) => {
      console.log("triggerFetchOrCreateDrawing");
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
    },
    [client, createDrawingMutation]
  );

  return {
    loading,
    triggerFetchOrCreateDrawing,
  };
}
