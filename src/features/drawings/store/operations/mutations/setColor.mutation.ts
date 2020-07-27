import { ReactiveVar } from '@apollo/client';
import { ToolState } from '../../models/tool.model';

export default (toolStateVar: ReactiveVar<ToolState>) => {
  return (color: string) => {
    const tool = toolStateVar();
    toolStateVar({ ...tool, color });
  };
};
