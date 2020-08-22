import store from "../../store";
import { BlendMode } from "../@types";
import { createPath, emitAddToHistory } from "../helper";
import { paperDrawingApiService } from "../shared/api/services";
import { Tool, ToolStructure } from "./tool";

export interface HandleEraseProps {
  path: paper.Path;
  point: paper.Point;
}

export const handleErase = ({ path, point }: HandleEraseProps) => {
  path.add(point);
  path.smooth();
};

class EraserTool extends Tool implements ToolStructure {
  private defaultStrokeCap = "round";
  private defaultStrokeJoin = "round";

  private size = store.getState().drawing.currentToolSize;
  private color = store.getState().drawing.backgroundColor;

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
      handleErase({ path: this.path, point });

      this.emitErase(point);
    }
  }

  private emitErase(point: paper.Point) {
    if (this.path) {
      paperDrawingApiService.erase({
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

export const eraserTool = new EraserTool();
