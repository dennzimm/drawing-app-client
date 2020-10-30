import store from "../../store";
import { CustomItemData } from "../@types";

/**
 * addCustomItemData
 *
 * This function is used to add custom data to a passed item.
 *
 * @param item
 * @param data
 */
export const addCustomItemData = (
  item: paper.Item,
  data: CustomItemData = {}
) => {
  item.data = {
    ...item.data,
    ...data,
  };
};

/**
 * addDefaultCustomItemData
 *
 * This function is used to add custom data with default values to a passed item.
 *
 * @param item
 */
export const addDefaultCustomItemData = (item: paper.Item) => {
  const userID = store.getState().user.id;
  addCustomItemData(item, { immutable: false, userID });
};
