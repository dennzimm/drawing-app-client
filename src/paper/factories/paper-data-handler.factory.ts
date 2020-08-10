import {
  DrawingDataPublished_drawingDataPublished,
  GetDrawing_drawing_items,
} from "../../api/@types/generated/gql-operations.types";
import { paperDataHelper } from "../helper";

export type PaperDataTypes =
  | DrawingDataPublished_drawingDataPublished["__typename"]
  | GetDrawing_drawing_items["__typename"];

export class PaperDataHandlerFactory {
  public static build(typeName: PaperDataTypes) {
    switch (typeName) {
      case "SegmentAdded":
        return paperDataHelper.handleSegmentAddedData;

      default:
        return undefined;
    }
  }
}
