import { toolVar } from '../../config/store.config';
import createSetColor from './setColor.mutation';
import createSetSize from './setSize.mutation';

export const toolMutations = <const>{
  setColor: createSetColor(toolVar),
  setSize: createSetSize(toolVar),
};
