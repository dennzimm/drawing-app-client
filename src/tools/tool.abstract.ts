import paper from 'paper';

export interface ToolStructure {
  tool: paper.Tool;
  onMouseDown: (event: paper.ToolEvent) => void;
  onMouseDrag: (event: paper.ToolEvent) => void;
  onMouseUp: (event: paper.ToolEvent) => void;
}

export abstract class Tool implements ToolStructure {
  public tool: paper.Tool;

  abstract onMouseDown(event: paper.ToolEvent): void;
  abstract onMouseDrag(event: paper.ToolEvent): void;
  abstract onMouseUp(event: paper.ToolEvent): void;

  constructor() {
    this.tool = new paper.Tool();

    this.setToolDefaults();
    this.setToolFunctions();
  }

  deselectAll() {
    paper.project.deselectAll();
  }

  private setToolDefaults() {
    this.tool.minDistance = 2;
  }

  private setToolFunctions() {
    this.tool.onMouseDown = this.onMouseDown.bind(this);
    this.tool.onMouseDrag = this.onMouseDrag.bind(this);
    this.tool.onMouseUp = this.onMouseUp.bind(this);
  }
}
