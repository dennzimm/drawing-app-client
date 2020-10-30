import { nanoid } from "nanoid";
import paper from "paper";
import {
  CreateCircleProps,
  CreateGroupProps,
  CreateLayerProps,
  CreatePathProps,
  CreateRoundLinecapProps,
} from "../@types";
import { addDefaultCustomItemData } from "./paper-data.helper";

/**
 * createLayer
 *
 * Helper function to create a paper layer.
 * Default data is added to the item (addDefaultCustomItemData).
 *
 * @param props
 */
export const createLayer = (props: CreateLayerProps = {}) => {
  const { name = nanoid(), options = {} } = props;
  const layer = new paper.Layer({ name, ...options });
  addDefaultCustomItemData(layer);

  return layer;
};

/**
 * createGroup
 *
 * Helper function to create a paper group.
 * Default data is added to the item (addDefaultCustomItemData).
 *
 * @param props
 */
export const createGroup = (props: CreateGroupProps = {}) => {
  const { name = nanoid(), options = {} } = props;
  const group = new paper.Group({ name, ...options });
  addDefaultCustomItemData(group);

  return group;
};

/**
 * createPath
 *
 * Helper function to create a paper path.
 * Default data is added to the item (addDefaultCustomItemData).
 *
 * @param props
 */
export const createPath = (props: CreatePathProps = {}) => {
  const { name = nanoid(), options = {} } = props;
  const path = new paper.Path({ name, ...options });
  addDefaultCustomItemData(path);

  return path;
};

/**
 * createCircle
 *
 * Helper function to create a paper circle.
 * Default data is added to the item (addDefaultCustomItemData).
 *
 * @param props
 */
export const createCircle = (props: CreateCircleProps = {}) => {
  const { name = nanoid(), options = {} } = props;
  const circle = new paper.Path.Circle({ name, ...options });
  addDefaultCustomItemData(circle);

  return circle;
};

/**
 * createRoundLinecap
 *
 * Helper function to create a round linecap (paper ellipse).
 * Default data is added to the item (addDefaultCustomItemData).
 *
 * @param props
 */
export const createRoundLinecap = (
  props: CreateRoundLinecapProps
): paper.Shape.Ellipse => {
  const { name = nanoid(), point, color, width } = props;

  const ellipse = new paper.Shape.Ellipse({
    name,
    strokeColor: color,
    fillColor: color,
    center: point,
    radius: width / 2,
  });

  addDefaultCustomItemData(ellipse);

  return ellipse;
};
