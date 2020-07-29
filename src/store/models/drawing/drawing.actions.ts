import { action, Action } from 'easy-peasy';
import { ToolName } from '../../../providers/tool.provider';
import { DrawingModel } from './drawing.model';

export enum DrawingAction {
  setCurrentToolColor = 'setCurrentToolColor',
  setCurrentToolName = 'setCurrentToolName',
  setCurrentToolSize = 'setCurrentToolSize',
}

export interface DrawingActions {
  [DrawingAction.setCurrentToolColor]: Action<DrawingModel, string>;
  [DrawingAction.setCurrentToolName]: Action<DrawingModel, ToolName>;
  [DrawingAction.setCurrentToolSize]: Action<DrawingModel, number>;
}

const drawingActions: DrawingActions = {
  [DrawingAction.setCurrentToolColor]: action((state, color) => {
    state.currentToolColor = color;
  }),
  [DrawingAction.setCurrentToolName]: action((state, toolName) => {
    state.currentToolName = toolName;
  }),
  [DrawingAction.setCurrentToolSize]: action((state, size) => {
    state.currentToolSize = size;
  }),
};

export default drawingActions;
