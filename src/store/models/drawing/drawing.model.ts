import { ToolName } from '../../../providers/tool.provider';
import { colors } from './config/colors.config';
import actions, { DrawingActions } from './drawing.actions';

export interface DrawingState {
  allColors: typeof colors;
  currentToolColor: string;
  currentToolName: ToolName;
  currentToolSize: number;
}

export type DrawingModel = DrawingState & DrawingActions;

const initialState: DrawingState = {
  allColors: colors,
  currentToolColor: colors[Math.floor(Math.random() * colors.length)],
  currentToolName: 'pencil',
  currentToolSize: 2,
};

const drawingModel: DrawingModel = {
  ...initialState,
  ...actions,
};

export default drawingModel;
