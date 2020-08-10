import store from "../../store";
import { CustomItemData } from "../@types";
import { paperProvider } from "../providers";

class PaperProjectService {
  importItem(json: string) {
    paperProvider.project.activeLayer.importJSON(json);
  }

  deleteOwnedItems(callback?: Function) {
    const userID = store.getState().user.userID;
    const options: Record<"data", CustomItemData> = {
      data: {
        userID,
        immutable: false,
      },
    };

    const deletedItems: string[] = [];

    paperProvider.project.getItems(options).forEach((item) => {
      const id = item.name;

      if (item.remove()) {
        deletedItems.push(id);
        callback && callback();
      }
    });

    return deletedItems;
  }
}

export const paperService = new PaperProjectService();
