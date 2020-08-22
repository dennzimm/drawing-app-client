import store from "../../store";
import { CustomItemData } from "../@types";

export const addCustomItemData = (
  item: paper.Item,
  data: CustomItemData = {}
) => {
  item.data = {
    ...item.data,
    ...data,
  };
};

export const addDefaultCustomItemData = (item: paper.Item) => {
  const userID = store.getState().user.userID;
  addCustomItemData(item, { immutable: false, userID });
};
