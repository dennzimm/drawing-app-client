import { action, Action } from "easy-peasy";
import { ToolName } from "../../../paper/providers";
import { DrawingModel } from "./drawing.model";

export enum DrawingAction {
  setDrawingID = "setDrawingID",
  setDrawingReady = "setDrawingReady",
  setCurrentToolColor = "setCurrentToolColor",
  setCurrentToolName = "setCurrentToolName",
  setCurrentToolSize = "setCurrentToolSize",
}

export interface DrawingActions {
  [DrawingAction.setDrawingID]: Action<DrawingModel, string>;
  [DrawingAction.setDrawingReady]: Action<DrawingModel, boolean>;
  [DrawingAction.setCurrentToolColor]: Action<DrawingModel, string>;
  [DrawingAction.setCurrentToolName]: Action<DrawingModel, ToolName>;
  [DrawingAction.setCurrentToolSize]: Action<DrawingModel, number>;
}

const drawingActions: DrawingActions = {
  [DrawingAction.setDrawingID]: action((state, id) => {
    state.id = id;
  }),
  [DrawingAction.setDrawingReady]: action((state, isReady) => {
    state.ready = isReady;
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
