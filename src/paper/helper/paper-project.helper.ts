import paper from "paper";
import { DEBUG } from "../../constants";
import store from "../../store";
import {
  CreateGroupProps,
  CreateLayerProps,
  CreatePathProps,
  CustomItemData,
} from "../@types";
import { createGroup, createPath } from "./paper-item.helper";

export const cleanupPaperProject = () => {
  paper.projects.forEach((project) => {
    project.layers.forEach((layer) => {
      layer.removeChildren();
    });
  });

  DEBUG && console.log("cleanupPaperProject");
};

export const deleteAllPaperProjects = () => {
  paper.projects.forEach((project) => project.remove());

  DEBUG && console.log("deleteAllPaperProjects");
};

export const findLayer = ({ name }: CreateLayerProps) => {
  let layer = paper.project.getItem({
    name,
  }) as paper.Layer;

  if (!layer) {
    layer = paper.project.activeLayer;
  }

  return layer;
};

export const findOrCreateGroup = ({
  name,
  layer,
  options,
}: CreateGroupProps & { layer?: paper.Layer }) => {
  let group = paper.project.getItem({
    name,
  }) as paper.Group;

  if (!group) {
    group = createGroup({
      name,
      options: {
        ...options,
        layer,
      },
    });
  }

  return group;
};

export const findOrCreatePath = ({ name, options }: CreatePathProps) => {
  let path = paper.project.getItem({
    name,
  }) as paper.Path;

  if (!path) {
    path = createPath({
      name,
    });
  }

  options && path.set(options);

  return path;
};

export const deleteItemByName = (name: string) => {
  const item = paper.project.getItem({ name });
  item && item.remove();
};

export const deleteItemsByName = (names: string[]) => {
  names.forEach((name) => deleteItemByName(name));
};

export const deleteAllItems = (callbackFn?: (itemName: string) => void) => {
  const itemNames: string[] = [];

  paper.project.activeLayer.getItems({}).forEach((item) => {
    const currentItemName = (item.name || item.id) + "";
    const itemRemoved = item.remove();

    if (itemRemoved) {
      itemNames.push(currentItemName);

      if (callbackFn) {
        try {
          callbackFn(currentItemName);
        } catch (err) {
          console.error(err);
        }
      }
    }
  });

  return itemNames;
};

export const deleteOwnedItems = (callback?: Function) => {
  const userID = store.getState().user.userID;
  const options: Record<"data", CustomItemData> = {
    data: {
      userID,
      immutable: false,
    },
  };

  const deletedItems: string[] = [];

  paper.project.getItems(options).forEach((item) => {
    const id = item.name;

    if (item.remove()) {
      deletedItems.push(id);
      callback && callback();
    }
  });

  return deletedItems;
};
