import { colors } from '../../../config/color-palette.config';
import paperToolProvider from '../../../providers/paper-tool.provider';
import { Tool } from '../../../tools/tool.abstract';
import actions, { ToolActions } from './tool.actions';
import computed, { ToolComputedItems } from './tool.computed';

export interface ToolState {
  currentTool: Tool;
  color: string;
  size: number;
}

export type ToolModel = ToolState & ToolActions & ToolComputedItems;

const state: ToolState = {
  currentTool: paperToolProvider.tools.pencil,
  color: colors[Math.floor(Math.random() * colors.length)],
  size: 2,
};

const toolModel: ToolModel = {
  ...state,
  ...computed,
  ...actions,
};

export default toolModel;
