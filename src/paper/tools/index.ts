import { pencilTool } from "./pencil.tool";
import { brushTool } from "./brush.tool";
import { eraserTool } from "./eraser.tool";

export * from "./tool";
export * from "./pencil.tool";
export * from "./brush.tool";
export * from "./eraser.tool";

export const availableTools = {
  pencil: pencilTool.tool,
  brush: brushTool.tool,
  eraser: eraserTool.tool,
} as const;

export type ToolName = keyof typeof availableTools;
