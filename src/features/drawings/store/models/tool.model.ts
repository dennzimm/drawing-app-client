import { ToolName } from '../../providers/tool.provider';

export interface Tool {
  toolName: ToolName;
  color: string;
  size: number;
}
