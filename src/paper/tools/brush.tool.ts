import { throttle } from "lodash-es";
import paper from "paper";
import {
  BrushDrawInput,
  ItemType,
} from "../../api/@types/generated/gql-operations.types";
import store from "../../store";
import { PaperViewEvents } from "../@types";
import { createPath, emitAddToHistory, emitOnView } from "../helper";
import { transformPaperPoint } from "../shared/api/transformer/paper-item.transformer";
import { Tool } from "./tool";

export interface HandleBrushDrawProps {
  path: paper.Path;
  size: number;
  delta?: paper.Point;
  middlePoint?: paper.Point;
  singlePoint?: paper.Point;
}

export class BrushTool extends Tool {
  public readonly defaultMinDistance = 1;
  public readonly defaultMaxDistance = 15;

  private path?: paper.Path;

  constructor() {
    super();
    this.tool.minDistance = this.defaultMinDistance;
    this.tool.maxDistance = this.defaultMaxDistance;
  }

  public handleBrushDraw({
    path,
    middlePoint,
    delta,
    size,
    singlePoint,
  }: HandleBrushDrawProps) {
    console.log({
      path,
      middlePoint,
      delta,
      size,
      singlePoint,
    });

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
  }

  protected onMouseDown(event: paper.ToolEvent) {
    const { toolSize } = store.getState().drawing;

    this.path = createPath({
      options: {
        ...this.getPathOptions(),
      },
    });

    this.handleBrushDraw({
      path: this.path,
      singlePoint: event.point,
      size: toolSize,
    });

    this.throttledEmitBrushDraw({ event, singlePoint: true });
  }

  protected onMouseDrag(event: paper.ToolEvent) {
    if (this.path) {
      const { toolSize } = store.getState().drawing;

      this.handleBrushDraw({
        path: this.path,
        delta: event.delta,
        middlePoint: event.middlePoint,
        size: toolSize,
      });

      this.throttledEmitBrushDraw({ event });
    }
  }

  protected onMouseUp(event: paper.ToolEvent) {
    if (this.path) {
      const { toolSize } = store.getState().drawing;

      this.handleBrushDraw({
        path: this.path,
        singlePoint: event.point,
        size: toolSize,
      });
      this.throttledEmitBrushDraw({ event, singlePoint: true, closed: true });

      this.path.closePath();
      this.path.simplify();
      paper.project.deselectAll();

      this.emitItemCreated({
        name: this.path.name,
        type: ItemType.PATH,
        data: this.path.exportJSON(),
      });

      emitAddToHistory(this.path);
    }
  }

  private getPathOptions() {
    const { toolSize, toolColor } = store.getState().drawing;

    return {
      strokeWidth: toolSize,
      fillColor: toolColor,
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
      emitOnView<BrushDrawInput>(PaperViewEvents.BRUSH_DRAW, {
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
      });
    }
  }

  private throttledEmitBrushDraw = throttle(this.emitBrushDraw, 20, {
    trailing: false,
  });
}

export const brushTool = new BrushTool();
