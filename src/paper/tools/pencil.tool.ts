import { throttle } from "lodash-es";
import paper from "paper";
import {
  ItemType,
  PencilDrawInput,
} from "../../api/@types/generated/gql-operations.types";
import store from "../../store";
import { PaperViewEvents, StrokeCapType, StrokeJoinType } from "../@types";
import { createPath, emitAddToHistory, emitOnView } from "../helper";
import { Tool } from "./tool";

export interface HandlePencilDrawProps {
  path: paper.Path;
  point: paper.Point;
}

/**
 * PencilTool
 *
 * This class is used to create a PencilTool
 * and extends the abstract 'Tool' class.
 *
 * The following functionalities were named and implemented
 * in a way that they are self-explanatory.
 *
 * With the help of the paper.js package it is possible
 * to paint with this tool on a paper view.
 * The painted path is smoothed after lifting the mouse button
 * or after finishing the touch (onMouseUp).
 *
 * The emitting of the draw event on the paper view
 * is throttled to optimize the performance.
 *
 * @export
 * @class PencilTool
 * @extends {Tool}
 */
export class PencilTool extends Tool {
  public readonly defaultStrokeCap = StrokeCapType.ROUND;
  public readonly defaultStrokeJoin = StrokeJoinType.ROUND;

  private path?: paper.Path;

  public handlePencilDraw({ path, point }: HandlePencilDrawProps) {
    path.add(point);
    path.smooth();
  }

  protected onMouseDown(event: paper.ToolEvent) {
    this.path = createPath({
      options: {
        ...this.getPathOptions(),
      },
    });

    this.handlePencilDraw({ path: this.path, point: event.point });
    this.throttledEmitPencilDraw(event.point);
  }

  protected onMouseDrag(event: paper.ToolEvent) {
    if (this.path) {
      this.handlePencilDraw({ path: this.path, point: event.point });
      this.throttledEmitPencilDraw(event.point);
    }
  }

  protected onMouseUp(event: paper.ToolEvent) {
    if (this.path) {
      const lastPoint = this.path.lastSegment.point.equals(event.point)
        ? event.point.add(1)
        : event.point;

      this.handlePencilDraw({ path: this.path, point: lastPoint });
      this.throttledEmitPencilDraw(event.point);

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
    const { toolColor, toolSize } = store.getState().drawing;

    return {
      strokeCap: this.defaultStrokeCap,
      strokeJoin: this.defaultStrokeJoin,
      strokeColor: toolColor,
      strokeWidth: toolSize,
    };
  }

  private emitPencilDraw(point: paper.Point) {
    if (this.path) {
      emitOnView<PencilDrawInput>(PaperViewEvents.PENCIL_DRAW, {
        layerID: this.path.layer.name,
        itemID: this.path.name,
        path: this.getPathOptions(),
        point: {
          x: point.x,
          y: point.y,
        },
      });
    }
  }

  private throttledEmitPencilDraw = throttle(
    this.emitPencilDraw,
    this.defaultEventThrottleWait,
    {
      trailing: false,
    }
  );
}

export const pencilTool = new PencilTool();
