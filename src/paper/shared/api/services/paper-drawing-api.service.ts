import {
  BrushDraw,
  BrushDrawVariables,
  CreateItem,
  CreateItemInput,
  CreateItemVariables,
  DeleteItem,
  DeleteItemInput,
  DeleteItemVariables,
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
import { CREATE_ITEM, DELETE_ITEM } from "../../../../api/graphql/item.graphql";
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

    client
      .mutate<PencilDraw, PencilDrawVariables>({
        mutation: PENCIL_DRAW.mutation,
        variables: {
          user: {
            userId,
          },
          drawing: {
            drawingName,
          },
          data,
        },
      })
      .catch((err) => {
        // todo: implement error handling
      });
  }

  brushDraw({ data }: BrushDrawMutationProps) {
    const userId = store.getState().user.userID;
    const drawingName = store.getState().drawing.id;

    client
      .mutate<BrushDraw, BrushDrawVariables>({
        mutation: BRUSH_DRAW.mutation,
        variables: {
          user: {
            userId,
          },
          drawing: {
            drawingName,
          },
          data,
        },
      })
      .catch((err) => {
        // todo: implement error handling
      });
  }

  erase({ data }: EraseMutationProps) {
    const userId = store.getState().user.userID;
    const drawingName = store.getState().drawing.id;

    client
      .mutate<Erase, EraseVariables>({
        mutation: ERASE.mutation,
        variables: {
          user: {
            userId,
          },
          drawing: {
            drawingName,
          },
          data,
        },
      })
      .catch((err) => {
        // todo: implement error handling
      });
  }

  createItem(data: CreateItemInput) {
    const userId = store.getState().user.userID;
    const drawingName = store.getState().drawing.id;

    client
      .mutate<CreateItem, CreateItemVariables>({
        mutation: CREATE_ITEM.mutation,
        variables: {
          user: {
            userId,
          },
          drawing: {
            drawingName,
          },
          data,
        },
      })
      .catch((err) => {
        // todo: implement error handling
      });
  }

  deleteItem(data: DeleteItemInput) {
    const userId = store.getState().user.userID;
    const drawingName = store.getState().drawing.id;

    client
      .mutate<DeleteItem, DeleteItemVariables>({
        mutation: DELETE_ITEM.mutation,
        variables: {
          user: {
            userId,
          },
          drawing: {
            drawingName,
          },
          data,
        },
      })
      .catch((err) => {
        // todo: implement error handling
      });
  }
}

export const paperDrawingApiService = new PaperDrawingApiService();
