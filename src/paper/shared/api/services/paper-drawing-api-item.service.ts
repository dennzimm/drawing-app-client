import {
  ItemMutated_itemMutated_node,
  MutationType,
} from "../../../../api/@types/generated/gql-operations.types";
import { deleteItemByName } from "../../../helper/paper-project.helper";
import { paperDrawingApiImportService } from "./paper-drawing-api-import.service";

/**
 * PaperDrawingApiItemService
 *
 * This service provides an itemMutation method
 * that decides depending on the type of mutation
 * which operation will be performed next.
 *
 * MutationType.CREATED: Performs importItemData from the
 *                       paperDrawingApiImportService
 *
 * MutationType.DELETED: Performs deleteItemByName from the
 *                       paper project helpers
 *
 * @class PaperDrawingApiItemService
 */
class PaperDrawingApiItemService {
  itemMutation(mutation: MutationType, item: ItemMutated_itemMutated_node) {
    switch (mutation) {
      case MutationType.CREATED: {
        paperDrawingApiImportService.importItemData(item);
        break;
      }
      case MutationType.DELETED: {
        deleteItemByName(item.name);
        break;
      }
      default: {
        break;
      }
    }
  }
}

export const paperDrawingApiItemService = new PaperDrawingApiItemService();
