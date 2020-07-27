import pencilTool from '../tools/pencil.tool';

class ToolProvider {
  private availableTools = <const>{
    pencil: pencilTool.tool,
  };

  getTool(name: ToolName) {
    return this.tools[name];
  }

  get tools() {
    return this.availableTools;
  }
}

const toolProvider = new ToolProvider();

export type ToolName = keyof typeof toolProvider.tools;

export default toolProvider;
