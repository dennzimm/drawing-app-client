import {
  ItemMutated_itemMutated_node,
  MutationType,
} from "../../../../api/@types/generated/gql-operations.types";
import { paperDrawingApiImportService } from "./paper-drawing-api-import.service";

class PaperDrawingApiItemService {
  itemMutation(mutation: MutationType, item: ItemMutated_itemMutated_node) {
    switch (mutation) {
      case MutationType.CREATED: {
        paperDrawingApiImportService.importItemData(item);
        break;
      }
      case MutationType.DELETED: {
        // todo:
        break;
      }
      default: {
        break;
      }
    }
  }
}

export const paperDrawingApiItemService = new PaperDrawingApiItemService();
