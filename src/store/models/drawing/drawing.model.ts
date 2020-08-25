import { colors } from "../../../paper/config";
import { ToolName } from "../../../paper/tools";
import actions, { DrawingActions } from "./drawing.actions";
import computed, { DrawingComputedItems } from "./drawing.computed";

export interface DrawingState {
  id: string;
  ready: boolean;
  currentToolColor: string;
  currentToolName: ToolName;
  currentToolSize: number;
  backgroundColor: string;
}

export type DrawingModel = DrawingState & DrawingActions & DrawingComputedItems;

const initialState: DrawingState = {
  id: "",
  ready: false,
  currentToolColor: colors[Math.floor(Math.random() * colors.length)],
  currentToolName: "pencil",
  currentToolSize: 2,
  backgroundColor: "#365959",
};

const drawingModel: DrawingModel = {
  ...initialState,
  ...actions,
  ...computed,
};

export default drawingModel;
