import { Computed, computed } from "easy-peasy";
import { DrawingModel } from "./drawing.model";

export enum DrawingComputedItem {
  eraserSelected = "eraserSelected",
}

export interface DrawingComputedItems {
  [DrawingComputedItem.eraserSelected]: Computed<DrawingModel, boolean>;
}

const drawingComputed: DrawingComputedItems = {
  [DrawingComputedItem.eraserSelected]: computed(
    (state) => state.toolName === "eraser"
  ),
};

export default drawingComputed;
