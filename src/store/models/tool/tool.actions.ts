import { action, Action } from 'easy-peasy';
import { ToolModel } from './tool.model';

export enum ToolAction {
  setColor = 'setColor',
  setSize = 'setSize',
}

export interface ToolActions {
  [ToolAction.setColor]: Action<ToolModel, string>;
  [ToolAction.setSize]: Action<ToolModel, number>;
}

const toolActions: ToolActions = {
  [ToolAction.setColor]: action((state, color) => {
    state.color = color;
  }),
  [ToolAction.setSize]: action((state, size) => {
    state.size = size;
  }),
};

export default toolActions;
