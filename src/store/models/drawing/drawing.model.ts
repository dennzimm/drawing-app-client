import { ToolName } from "../../../paper/tools";
import actions, { DrawingActions } from "./drawing.actions";
import computed, { DrawingComputedItems } from "./drawing.computed";
import { COLORS } from "../../../constants";

export interface DrawingState {
  id: string;
  paperReady: boolean;
  toolColor: string;
  toolName: ToolName;
  toolSize: number;
}

export type DrawingModel = DrawingState & DrawingActions & DrawingComputedItems;

const initialState: DrawingState = {
  id: "",
  paperReady: false,
  toolColor: COLORS[Math.floor(Math.random() * COLORS.length)],
  toolName: "pencil",
  toolSize: 2,
};

const drawingModel: DrawingModel = {
  ...initialState,
  ...actions,
  ...computed,
};

export default drawingModel;
