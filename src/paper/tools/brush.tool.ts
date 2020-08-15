import store from "../../store";
import { paperProjectHelper } from "../helper";
import { Tool, ToolStructure } from "./tool";
import { paperEventService } from "../services";
import { DrawingDataActionType } from "../@types";

export class BrushTool extends Tool implements ToolStructure {
  private defaultMinDistance = 1;
  private defaultMaxDistance = 25;

  private size = store.getState().drawing.currentToolSize;
  private color = store.getState().drawing.currentToolColor;

  private path?: paper.Path;

  constructor() {
    super();
    this.tool.minDistance = this.defaultMinDistance;
    this.tool.maxDistance = this.defaultMaxDistance;
  }

  onMouseDown(event: paper.ToolEvent) {
    this.setToolOptions();

    this.path = paperProjectHelper.createPath({
      options: {
        ...this.getPathOptions(),
      },
    });

    this.path.add(event.point);

    this.emitBrushDrawing([event.point]);
  }

  onMouseDrag(event: paper.ToolEvent) {
    if (this.path) {
      let step = event.delta.multiply(this.size / 5);
      step.angle += 90;

      const top = event.middlePoint.add(step);
      const bottom = event.middlePoint.subtract(step);

      this.path.add(top);
      this.path.insert(0, bottom);
      this.path.smooth();

      this.emitBrushDrawing([top, bottom]);
    }
  }

  onMouseUp(event: paper.ToolEvent) {
    if (this.path) {
      this.path.add(event.point);
      this.path.closePath();
      this.path.smooth();

      this.emitBrushDrawing([event.point]);
    }
  }

  private setToolOptions() {
    const { currentToolColor, currentToolSize } = store.getState().drawing;
    this.size = currentToolSize;
    this.color = currentToolColor;
  }

  private getPathOptions() {
    return {
      strokeWidth: this.size,
      fillColor: this.color,
    };
  }

  private emitBrushDrawing(points: paper.Point[]) {
    if (this.path) {
      paperEventService.emitDrawingDataAction({
        action: DrawingDataActionType.BRUSH_DRAWING,
        payload: {
          item: this.path,
          points,
          pathOptions: this.getPathOptions(),
        },
      });
    }
  }
}

export const brushTool = new BrushTool();
