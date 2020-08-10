import { colors } from "../../../paper/config";
import { ToolName } from "../../../paper/providers";
import actions, { DrawingActions } from "./drawing.actions";

export interface DrawingState {
  ready: boolean;
  currentToolColor: string;
  currentToolName: ToolName;
  currentToolSize: number;
}

export type DrawingModel = DrawingState & DrawingActions;

const initialState: DrawingState = {
  ready: false,
  currentToolColor: colors[Math.floor(Math.random() * colors.length)],
  currentToolName: "pencil",
  currentToolSize: 2,
};

const drawingModel: DrawingModel = {
  ...initialState,
  ...actions,
};

export default drawingModel;
