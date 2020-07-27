import { ReactiveVar } from '@apollo/client';
import { Tool } from '../../models/tool.model';

export default (toolVar: ReactiveVar<Tool>) => {
  return (size: number) => {
    const tool = toolVar();
    toolVar({ ...tool, size });
  };
};
