import { toolStateVar } from '../../config/store.config';
import createSetColor from './setColor.mutation';
import createSetSize from './setSize.mutation';

export const toolMutations = {
  setColor: createSetColor(toolStateVar),
  setSize: createSetSize(toolStateVar),
} as const;
