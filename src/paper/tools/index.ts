import { brushTool } from "./brush.tool";
import { eraserTool } from "./eraser.tool";
import { pencilTool } from "./pencil.tool";

export const availableTools = {
  pencil: pencilTool.tool,
  brush: brushTool.tool,
  eraser: eraserTool.tool,
} as const;

export type ToolName = keyof typeof availableTools;
