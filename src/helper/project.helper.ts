import { nanoid } from 'nanoid';
import paper from 'paper';

export interface CreateHelper {
  id?: string;
  options?: Record<string, unknown>;
}

export const createLayer = ({
  id = nanoid(),
  options = {},
}: CreateHelper = {}) => {
  const layer = new paper.Layer({ name: id, ...options });
  paper.project.addLayer(layer);

  return layer;
};

export const createGroup = ({
  id = nanoid(),
  options = {},
}: CreateHelper = {}) => {
  const group = new paper.Group({ name: id, ...options });

  return group;
};

export const createPath = ({
  id = nanoid(),
  options = {},
}: CreateHelper = {}) => {
  const path = new paper.Path({ name: id, ...options });

  return path;
};
