import { ToolName } from '../../providers/tool.provider';

export interface ToolState {
  toolName: ToolName;
  color: string;
  size: number;
}
