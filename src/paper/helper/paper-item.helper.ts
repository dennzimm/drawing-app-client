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

export const createLayer = (props: CreateLayerProps = {}) => {
  const { name = nanoid(), options = {} } = props;
  const layer = new paper.Layer({ name, ...options });
  addDefaultCustomItemData(layer);

  return layer;
};

export const createGroup = (props: CreateGroupProps = {}) => {
  const { name = nanoid(), options = {} } = props;
  const group = new paper.Group({ name, ...options });
  addDefaultCustomItemData(group);

  return group;
};

export const createPath = (props: CreatePathProps = {}) => {
  const { name = nanoid(), options = {} } = props;
  const path = new paper.Path({ name, ...options });
  addDefaultCustomItemData(path);

  return path;
};

export const createCircle = (props: CreateCircleProps = {}) => {
  const { name = nanoid(), options = {} } = props;
  const circle = new paper.Path.Circle({ name, ...options });
  addDefaultCustomItemData(circle);

  return circle;
};

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
