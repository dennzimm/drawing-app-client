import { nanoid } from 'nanoid';
import paperProvider from '../providers/paper.provider';

export interface CreateHelper {
  id?: string;
  options?: Record<string, unknown>;
}

const defaultCreateHelperProps: CreateHelper = {
  id: undefined,
  options: {},
};

export const createLayer = (props: CreateHelper = defaultCreateHelperProps) => {
  const { id = nanoid(), options } = props;
  const layer = new paperProvider.scope.Layer({ name: id, ...options });

  return layer;
};

export const createGroup = (props: CreateHelper = defaultCreateHelperProps) => {
  const { id = nanoid(), options } = props;
  const group = new paperProvider.scope.Group({ name: id, ...options });

  return group;
};

export const createPath = (props: CreateHelper = defaultCreateHelperProps) => {
  const { id = nanoid(), options } = props;
  const path = new paperProvider.scope.Path({ name: id, ...options });

  return path;
};
