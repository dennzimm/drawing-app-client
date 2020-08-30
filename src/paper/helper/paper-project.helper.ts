import paper from "paper";
import { DEBUG } from "../../constants";
import { CreateGroupProps, CreateLayerProps, CreatePathProps } from "../@types";
import { createGroup, createPath } from "./paper-item.helper";
import { get } from "lodash-es";

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

export const deleteAllLayers = () => {
  paper.project.layers.forEach((layer) => {
    layer.removeChildren();
  });
};

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
