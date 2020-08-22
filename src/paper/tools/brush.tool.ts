import store from "../../store";
import { createPath } from "../helper";
import { paperDrawingApiService } from "../shared/api/services";
import { transformPaperPoint } from "../shared/api/transformer/paper-item.transformer";
import { Tool, ToolStructure } from "./tool";

export interface HandleBrushDrawProps {
  path: paper.Path;
  size: number;
  delta?: paper.Point;
  middlePoint?: paper.Point;
  singlePoint?: paper.Point;
}

export const handleBrushDraw = ({
  path,
  middlePoint,
  delta,
  size,
  singlePoint,
}: HandleBrushDrawProps) => {
  if (singlePoint) {
    path.add(singlePoint);
  } else if (delta && middlePoint) {
    let step = delta.multiply(size / 5);
    step.angle += 90;

    const top = middlePoint.add(step);
    const bottom = middlePoint.subtract(step);

    path.add(top);
    path.insert(0, bottom);
    path.smooth();
  }
};

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

    this.path = createPath({
      options: {
        ...this.getPathOptions(),
      },
    });

    handleBrushDraw({
      path: this.path,
      singlePoint: event.point,
      size: this.size,
    });

    this.emitBrushDraw({ event, singlePoint: true });
  }

  onMouseDrag(event: paper.ToolEvent) {
    if (this.path) {
      handleBrushDraw({
        path: this.path,
        delta: event.delta,
        middlePoint: event.middlePoint,
        size: this.size,
      });

      this.emitBrushDraw({ event });
    }
  }

  onMouseUp(event: paper.ToolEvent) {
    if (this.path) {
      handleBrushDraw({
        path: this.path,
        singlePoint: event.point,
        size: this.size,
      });

      this.path.closePath();
      this.path.smooth();

      this.emitBrushDraw({ event, singlePoint: true, closed: true });
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

  private emitBrushDraw({
    event,
    singlePoint,
    closed,
  }: {
    event: paper.ToolEvent;
    singlePoint?: boolean;
    closed?: boolean;
  }) {
    if (this.path) {
      paperDrawingApiService.brushDraw({
        data: {
          layerID: this.path.layer.name,
          itemID: this.path.name,
          path: {
            ...this.getPathOptions(),
            closed,
          },
          ...(!singlePoint && {
            delta: transformPaperPoint(event.delta),
            middlePoint: transformPaperPoint(event.middlePoint),
          }),
          ...(singlePoint && {
            singlePoint: transformPaperPoint(event.point),
          }),
        },
      });
    }
  }
}

export const brushTool = new BrushTool();
