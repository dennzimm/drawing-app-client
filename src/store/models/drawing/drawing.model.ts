import { colors } from "../../../paper/config";
import { ToolName } from "../../../paper/providers";
import actions, { DrawingActions } from "./drawing.actions";

export interface DrawingState {
  id: string | undefined;
  ready: boolean;
  currentToolColor: string;
  currentToolName: ToolName;
  currentToolSize: number;
  backgroundColor: string;
}

export type DrawingModel = DrawingState & DrawingActions;

const initialState: DrawingState = {
  id: undefined,
  ready: false,
  currentToolColor: colors[Math.floor(Math.random() * colors.length)],
  currentToolName: "pencil",
  currentToolSize: 2,
  backgroundColor: "#365959",
};

const drawingModel: DrawingModel = {
  ...initialState,
  ...actions,
};

export default drawingModel;
