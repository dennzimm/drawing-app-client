import { ReactiveVar } from '@apollo/client';
import { ToolState } from '../../models/tool.model';

export default (toolStateVar: ReactiveVar<ToolState>) => {
  return (size: number) => {
    const tool = toolStateVar();
    toolStateVar({ ...tool, size });
  };
};
