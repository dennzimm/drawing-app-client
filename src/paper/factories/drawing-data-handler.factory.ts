import { DrawingDataPublished_drawingDataPublished } from "../../api/@types/gql-operations.types";
import { handleSegmentAdded } from "../helper";

export type PaperDataTypes = DrawingDataPublished_drawingDataPublished["__typename"];

export class PaperDataHandlerFactory {
  public static build(typeName: PaperDataTypes) {
    switch (typeName) {
      case "NewSegment":
        return handleSegmentAdded;

      default:
        return undefined;
    }
  }
}
