import { action, Action } from 'easy-peasy';
import { ToolModel } from './tool.model';

export enum ToolAction {
  setColor = 'setColor',
}

export interface ToolActions {
  [ToolAction.setColor]: Action<ToolModel, string>;
}

const toolActions: ToolActions = {
  [ToolAction.setColor]: action((state, color) => {
    state.color = color;
  }),
};

export default toolActions;
