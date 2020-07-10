import { nanoid } from 'nanoid';
import paperProvider from '../providers/paper.provider';

export interface CreateHelper {
  id?: string;
  options?: Record<string, unknown>;
}

export const createLayer = (props: CreateHelper) => {
  const { id = nanoid(), options } = props;
  const layer = new paperProvider.scope.Layer({ name: id, ...options });

  return layer;
};

export const createGroup = (props: CreateHelper) => {
  const { id = nanoid(), options } = props;
  const group = new paperProvider.scope.Group({ name: id, ...options });

  return group;
};

export const createPath = (props: CreateHelper) => {
  const { id = nanoid(), options } = props;
  const path = new paperProvider.scope.Path({ name: id, ...options });

  return path;
};
