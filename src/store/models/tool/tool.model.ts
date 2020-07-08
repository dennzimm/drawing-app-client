import { tools } from '../../../tools';
import { Tool } from '../../../tools/tool.abstract';
import actions, { ToolActions } from './tool.actions';
import computed, { ToolComputedItems } from './tool.computed';

export interface ToolState {
  currentTool: Tool;
  color: string;
  width: number;
}

export type ToolModel = ToolState & ToolActions & ToolComputedItems;

const state: ToolState = {
  currentTool: tools['pencil'],
  color: '#000000',
  width: 3,
};

const toolModel: ToolModel = {
  ...state,
  ...computed,
  ...actions,
};

export default toolModel;
