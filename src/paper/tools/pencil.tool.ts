import store from "../../store";
import { createPath, emitAddToHistory } from "../helper";
import { paperDrawingApiService } from "../shared/api/services";
import { Tool, ToolStructure } from "./tool";

export interface HandlePencilDrawProps {
  path: paper.Path;
  point: paper.Point;
}

export const handlePencilDraw = ({ path, point }: HandlePencilDrawProps) => {
  path.add(point);
  path.smooth();
};

export class PencilTool extends Tool implements ToolStructure {
  defaultStrokeCap = "round";
  defaultStrokeJoin = "round";

  private size = store.getState().drawing.currentToolSize;
  private color = store.getState().drawing.currentToolColor;

  private path?: paper.Path;

  onMouseDown(event: paper.ToolEvent) {
    this.setToolOptions();

    this.path = createPath({
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

      emitAddToHistory(this.path);
      // paperEventService.emitItemAdded(this.path);
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
      handlePencilDraw({ path: this.path, point });

      this.emitPencilDraw(point);
    }
  }

  private emitPencilDraw(point: paper.Point) {
    if (this.path) {
      paperDrawingApiService.pencilDraw({
        data: {
          layerID: this.path.layer.name,
          itemID: this.path.name,
          path: this.getPathOptions(),
          point: {
            x: point.x,
            y: point.y,
          },
        },
      });
    }
  }
}

export const pencilTool = new PencilTool();
