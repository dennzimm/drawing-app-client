import paper from "paper";
import { DEBUG } from "../../constants";
import { CreateGroupProps, CreateLayerProps, CreatePathProps } from "../@types";
import { createGroup, createPath } from "./paper-item.helper";
import { get } from "lodash-es";

/**
 * deleteAllPaperProjects
 *
 * Helper function to delete all paper projects.
 */
export const deleteAllPaperProjects = () => {
  paper.projects.forEach((project) => project.remove());

  DEBUG && console.log("deleteAllPaperProjects");
};

/**
 * findLayer
 *
 * Helper function to find a paper layer for a given name.
 * If no layer is found, the active layer is returned.
 */
export const findLayer = ({ name }: CreateLayerProps) => {
  let layer = paper.project.getItem({
    name,
  }) as paper.Layer;

  if (!layer) {
    layer = paper.project.activeLayer;
  }

  return layer;
};

/**
 * findOrCreateGroup
 *
 * Helper function to find or create a paper group.
 * If no group is found for a given name, a new group is
 * created and returned.
 */
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

/**
 * findOrCreatePath
 *
 * Helper function to find or create a paper path.
 * If no path is found for a given name, a new path is
 * created and returned.
 */
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

/**
 * deleteItemByName
 *
 * Helper function to delete a paper item by name.
 */
export const deleteItemByName = (name: string) => {
  const item = paper.project.getItem({ name });
  item && item.remove();
};

/**
 * deleteItemsByName
 *
 * Helper function to delete a paper items by names.
 */
export const deleteItemsByName = (names: string[]) => {
  names.forEach((name) => deleteItemByName(name));
};

/**
 * deleteAllLayers
 *
 * Helper function to delete all paper layers.
 */
export const deleteAllLayers = () => {
  paper.project.layers.forEach((layer) => {
    layer.removeChildren();
  });
};

/**
 * deleteAllItems
 *
 * Helper function to delete all paper items that are immutable.
 *
 * @return {[itemNames]}
 */
export const deleteAllItems = () => {
  DEBUG && console.log("deleteAllItems");

  const itemNames: string[] = [];

  paper.project.getItems({}).forEach((item) => {
    const isImmutable = get(item, "data.immutable", false);
    if (isImmutable) {
      return;
    }

    const currentItemName = (item.name || item.id) + "";
    const itemRemoved = item.remove();

    if (itemRemoved) {
      itemNames.push(currentItemName);
    }
  });

  return itemNames;
};
