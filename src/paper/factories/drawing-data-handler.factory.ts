import {
  DrawingDataPublished_drawingDataPublished,
  GetDrawing_drawing_items,
} from "../../api/@types/gql-operations.types";
import { handleSegmentAdded } from "../helper";

export type PaperDataTypes =
  | DrawingDataPublished_drawingDataPublished["__typename"]
  | GetDrawing_drawing_items["__typename"];

export class PaperDataHandlerFactory {
  public static build(typeName: PaperDataTypes) {
    switch (typeName) {
      case "SegmentAdded":
        return handleSegmentAdded;

      default:
        return undefined;
    }
  }
}
