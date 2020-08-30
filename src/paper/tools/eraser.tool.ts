import { throttle } from "lodash-es";
import paper from "paper";
import {
  EraseInput,
  ItemType,
} from "../../api/@types/generated/gql-operations.types";
import store from "../../store";
import {
  BlendMode,
  PaperViewEvents,
  StrokeCapType,
  StrokeJoinType,
} from "../@types";
import { createPath, emitAddToHistory, emitOnView } from "../helper";
import { Tool } from "./tool";

export interface HandleEraseProps {
  path: paper.Path;
  point: paper.Point;
}

class EraserTool extends Tool {
  public readonly defaultBlendMode = BlendMode.DESTINATION_OUT;
  public readonly defaultStrokeCap = StrokeCapType.ROUND;
  public readonly defaultStrokeJoin = StrokeJoinType.ROUND;
  public readonly defaultStrokeColor = "white";

  private path?: paper.Path;

  public handleErase({ path, point }: HandleEraseProps) {
    path.add(point);
    path.smooth();
  }

  protected onMouseDown(event: paper.ToolEvent) {
    this.path = createPath({
      options: {
        ...this.getPathOptions(),
      },
    });

    this.handleErase({ path: this.path, point: event.point });
    this.throttledEmitErase(event.point);
  }

  protected onMouseDrag(event: paper.ToolEvent) {
    if (this.path) {
      this.handleErase({ path: this.path, point: event.point });
      this.throttledEmitErase(event.point);
    }
  }

  protected onMouseUp(event: paper.ToolEvent) {
    if (this.path) {
      const lastPoint = this.path.lastSegment.point.equals(event.point)
        ? event.point.add(1)
        : event.point;

      this.handleErase({ path: this.path, point: lastPoint });
      this.throttledEmitErase(lastPoint);

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
      blendMode: this.defaultBlendMode,
      strokeCap: this.defaultStrokeCap,
      strokeJoin: this.defaultStrokeJoin,
      strokeColor: toolColor,
      strokeWidth: toolSize,
    };
  }

  private emitErase(point: paper.Point) {
    if (this.path) {
      emitOnView<EraseInput>(PaperViewEvents.ERASE, {
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

  private throttledEmitErase = throttle(
    this.emitErase,
    this.defaultEventThrottleWait,
    {
      trailing: false,
    }
  );
}

export const eraserTool = new EraserTool();
