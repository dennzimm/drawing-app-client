import { action, Action } from "easy-peasy";
import { ToolName } from "../../../paper/tools";
import { DrawingModel } from "./drawing.model";

export enum DrawingAction {
  setDrawingID = "setDrawingID",
  setPaperReady = "setPaperReady",
  setCurrentToolColor = "setCurrentToolColor",
  setCurrentToolName = "setCurrentToolName",
  setCurrentToolSize = "setCurrentToolSize",
}

export interface DrawingActions {
  [DrawingAction.setDrawingID]: Action<DrawingModel, string>;
  [DrawingAction.setPaperReady]: Action<DrawingModel, boolean>;
  [DrawingAction.setCurrentToolColor]: Action<DrawingModel, string>;
  [DrawingAction.setCurrentToolName]: Action<DrawingModel, ToolName>;
  [DrawingAction.setCurrentToolSize]: Action<DrawingModel, number>;
}

const drawingActions: DrawingActions = {
  [DrawingAction.setDrawingID]: action((state, id) => {
    state.id = id;
  }),
  [DrawingAction.setPaperReady]: action((state, isReady) => {
    state.paperReady = isReady;
  }),
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
