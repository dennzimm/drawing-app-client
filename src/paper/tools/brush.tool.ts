import store from "../../store";
import { paperProjectHelper } from "../helper";
import { Tool, ToolStructure } from "./tool";

export class BrushTool extends Tool implements ToolStructure {
  private defaultMinDistance = 10;
  private defaultMaxDistance = 25;

  private path?: paper.Path;

  constructor() {
    super();
    this.tool.minDistance = this.defaultMinDistance;
    this.tool.maxDistance = this.defaultMaxDistance;
  }

  onMouseDown(event: paper.ToolEvent) {
    const { currentToolColor: fillColor } = store.getState().drawing;

    this.path = paperProjectHelper.createPath({
      options: {
        fillColor,
      },
    });

    this.path.add(event.point);
  }

  onMouseDrag(event: paper.ToolEvent) {
    if (this.path) {
      let step = event.delta;
      step.angle += 90;

      const top = event.middlePoint.add(step);
      const bottom = event.middlePoint.subtract(step);

      this.path.add(top);
      this.path.insert(0, bottom);
      this.path.smooth();
    }
  }

  onMouseUp(event: paper.ToolEvent) {
    if (this.path) {
      this.path.add(event.point);
      this.path.closePath();
      this.path.smooth();
    }
  }
}

export const brushTool = new BrushTool();
