import store from "../../store";
import { DrawingDataActionType } from "../@types";
import { paperProjectHelper } from "../helper";
import { paperEventService } from "../services";
import { Tool, ToolStructure } from "./tool";

export class PencilTool extends Tool implements ToolStructure {
  private defaultStrokeCap = "round";
  private defaultStrokeJoin = "round";

  private size = store.getState().drawing.currentToolSize;
  private color = store.getState().drawing.currentToolColor;

  private path?: paper.Path;

  onMouseDown(event: paper.ToolEvent) {
    this.setToolOptions();

    this.path = paperProjectHelper.createPath({
      options: {
        ...this.getPathOptions(),
      },
    });

    this.addPoint(event.point);
  }

  onMouseDrag(event: paper.ToolEvent) {
    if (this.path) {
      this.addPoint(event.point);
    }
  }

  onMouseUp(event: paper.ToolEvent) {
    if (this.path) {
      const lastPoint = this.path.lastSegment.point.equals(event.point)
        ? event.point.add(1)
        : event.point;

      this.addPoint(lastPoint);
      this.path.simplify();
      this.deselectAll();

      paperEventService.emitAddToHistory(this.path);
      paperEventService.emitItemAdded(this.path);
    }
  }

  private setToolOptions() {
    const { currentToolColor, currentToolSize } = store.getState().drawing;
    this.size = currentToolSize;
    this.color = currentToolColor;
  }

  private getPathOptions() {
    return {
      strokeCap: this.defaultStrokeCap,
      strokeJoin: this.defaultStrokeJoin,
      strokeColor: this.color,
      strokeWidth: this.size,
    };
  }

  private addPoint(point: paper.Point) {
    if (this.path) {
      this.path.add(point);
      this.path.smooth();

      paperEventService.emitDrawingDataAction({
        action: DrawingDataActionType.PENCIL_DRAWING,
        payload: {
          item: this.path,
          points: [point],
          pathOptions: this.getPathOptions(),
        },
      });
    }
  }
}

export const pencilTool = new PencilTool();
