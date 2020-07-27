import { nanoid } from 'nanoid';
import { Layer, Group, Path } from 'paper';

export interface CreateHelper {
  name?: string;
  options?: Record<string, unknown>;
}

const defaultCreateHelperProps: CreateHelper = {
  name: undefined,
  options: {},
};

export const createLayer = (props: CreateHelper = defaultCreateHelperProps) => {
  const { name = nanoid(), options } = props;
  const layer = new Layer({ name, ...options });

  return layer;
};

export const createGroup = (props: CreateHelper = defaultCreateHelperProps) => {
  const { name = nanoid(), options } = props;
  const group = new Group({ name, ...options });

  return group;
};

export const createPath = (props: CreateHelper = defaultCreateHelperProps) => {
  const { name = nanoid(), options } = props;
  const path = new Path({ name, ...options });

  return path;
};
