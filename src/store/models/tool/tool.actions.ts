import { action, Action } from 'easy-peasy';
import { ToolModel } from './tool.model';

export enum ToolAction {
  setColor = 'setColor',
  setWidth = 'setWidth',
}

export interface ToolActions {
  [ToolAction.setColor]: Action<ToolModel, string>;
  [ToolAction.setWidth]: Action<ToolModel, number>;
}

const toolActions: ToolActions = {
  [ToolAction.setColor]: action((state, color) => {
    state.color = color;
  }),
  [ToolAction.setWidth]: action((state, width) => {
    state.width = width;
  }),
};

export default toolActions;
