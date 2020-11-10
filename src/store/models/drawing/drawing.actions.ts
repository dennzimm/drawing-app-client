import { action, Action } from "easy-peasy";
import { ToolName } from "../../../paper/tools";
import { DrawingModel } from "./drawing.model";

export enum DrawingAction {
  setID = "setID",
  setPaperReady = "setPaperReady",
  setToolColor = "setToolColor",
  setToolName = "setToolName",
  setToolSize = "setToolSize",
}

export interface DrawingActions {
  [DrawingAction.setID]: Action<DrawingModel, string>;
  [DrawingAction.setPaperReady]: Action<DrawingModel, boolean>;
  [DrawingAction.setToolColor]: Action<DrawingModel, string>;
  [DrawingAction.setToolName]: Action<DrawingModel, ToolName>;
  [DrawingAction.setToolSize]: Action<DrawingModel, number>;
}

const drawingActions: DrawingActions = {
  [DrawingAction.setID]: action((state, id) => {
    state.id = id;
  }),
  [DrawingAction.setPaperReady]: action((state, isReady) => {
    state.paperReady = isReady;
  }),
  [DrawingAction.setToolColor]: action((state, color) => {
    state.toolColor = color;
  }),
  [DrawingAction.setToolName]: action((state, toolName) => {
    state.toolName = toolName;
  }),
  [DrawingAction.setToolSize]: action((state, size) => {
    state.toolSize = size;
  }),
};

export default drawingActions;
