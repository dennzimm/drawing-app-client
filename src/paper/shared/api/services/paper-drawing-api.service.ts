import {
  BrushDraw,
  BrushDrawVariables,
  Erase,
  EraseVariables,
  PencilDraw,
  PencilDrawVariables,
} from "../../../../api/@types/generated/gql-operations.types";
import { client } from "../../../../api/config";
import {
  BRUSH_DRAW,
  ERASE,
  PENCIL_DRAW,
} from "../../../../api/graphql/drawing-action.graphql";
import store from "../../../../store";

export interface PencilDrawMutationProps
  extends Pick<PencilDrawVariables, "data"> {}

export interface BrushDrawMutationProps
  extends Pick<BrushDrawVariables, "data"> {}

export interface EraseMutationProps extends Pick<EraseVariables, "data"> {}

class PaperDrawingApiService {
  pencilDraw({ data }: PencilDrawMutationProps) {
    const userId = store.getState().user.userID;
    const drawingName = store.getState().drawing.id;

    client.mutate<PencilDraw, PencilDrawVariables>({
      mutation: PENCIL_DRAW,
      variables: {
        user: {
          userId,
        },
        drawing: {
          drawingName,
        },
        data,
      },
    });
  }

  brushDraw({ data }: BrushDrawMutationProps) {
    const userId = store.getState().user.userID;
    const drawingName = store.getState().drawing.id;

    client.mutate<BrushDraw, BrushDrawVariables>({
      mutation: BRUSH_DRAW,
      variables: {
        user: {
          userId,
        },
        drawing: {
          drawingName,
        },
        data,
      },
    });
  }

  erase({ data }: EraseMutationProps) {
    const userId = store.getState().user.userID;
    const drawingName = store.getState().drawing.id;

    client.mutate<Erase, EraseVariables>({
      mutation: ERASE,
      variables: {
        user: {
          userId,
        },
        drawing: {
          drawingName,
        },
        data,
      },
    });
  }
}

export const paperDrawingApiService = new PaperDrawingApiService();
