import { ReactiveVar } from '@apollo/client';
import { Tool } from '../../models/tool.model';

export default (toolVar: ReactiveVar<Tool>) => {
  return (color: string) => {
    const tool = toolVar();
    toolVar({ ...tool, color });
  };
};
