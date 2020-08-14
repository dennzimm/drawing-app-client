import { pencilTool, brushTool, eraserTool } from "../tools";

class ToolProvider {
  private availableTools = {
    pencil: pencilTool.tool,
    brush: brushTool.tool,
    eraser: eraserTool.tool,
  } as const;

  getTool(name: ToolName) {
    return this.tools[name];
  }

  get tools() {
    return this.availableTools;
  }
}

export const toolProvider = new ToolProvider();

export type ToolName = keyof typeof toolProvider.tools;
