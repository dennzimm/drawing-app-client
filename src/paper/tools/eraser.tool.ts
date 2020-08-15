import store from "../../store";
import { BlendMode, DrawingDataActionType } from "../@types";
import { paperProjectHelper } from "../helper";
import { paperEventService } from "../services";
import { Tool, ToolStructure } from "./tool";

class EraserTool extends Tool implements ToolStructure {
  private defaultStrokeCap = "round";
  private defaultStrokeJoin = "round";

  private size = store.getState().drawing.currentToolSize;
  private color = store.getState().drawing.backgroundColor;

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
    const { currentToolSize, backgroundColor } = store.getState().drawing;
    this.size = currentToolSize;
    this.color = backgroundColor;
  }

  private getPathOptions() {
    return {
      blendMode: BlendMode.DESTINATION_OUT,
      strokeCap: this.defaultStrokeCap,
      strokeJoin: this.defaultStrokeJoin,
      strokeWidth: this.size,
      strokeColor: this.color,
    };
  }

  private addPoint(point: paper.Point) {
    if (this.path) {
      this.path.add(point);

      paperEventService.emitDrawingDataAction({
        action: DrawingDataActionType.ERASE_DRAWING,
        payload: {
          item: this.path,
          points: [point],
          pathOptions: this.getPathOptions(),
        },
      });
    }
  }
}

export const eraserTool = new EraserTool();
