import { pencilTool } from '../tools/pencil.tool';

class paperToolProvider {
  private availableTools = {
    pencil: pencilTool,
  } as const;

  get tools() {
    return this.availableTools;
  }
}

export default new paperToolProvider();
