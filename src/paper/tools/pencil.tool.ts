import store from "../../store";
import { BlendMode } from "../@types";
import { paperProjectHelper } from "../helper";
import { paperEventService } from "../services";
import { Tool, ToolStructure } from "./tool";

export interface PencilToolProps {
  blendMode?: BlendMode;
}

export class PencilTool extends Tool implements ToolStructure {
  private blendMode: BlendMode = BlendMode.NORMAL;
  private path?: paper.Path;

  constructor(props: PencilToolProps = {}) {
    super();
    this.blendMode = props.blendMode || this.blendMode;
  }

  onMouseDown(event: paper.ToolEvent) {
    this.path = paperProjectHelper.createPath({
      options: {
        ...this.getPathOptions(),
      },
    });

    this.addPoint(event.point);

    console.log(this.getPathOptions());
  }

  onMouseDrag(event: paper.ToolEvent) {
    console.log("draw");
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

  private getPathOptions() {
    const {
      currentToolColor: strokeColor,
      currentToolSize: strokeWidth,
    } = store.getState().drawing;

    return {
      blendMode: this.blendMode,
      strokeCap: "round",
      strokeJoin: "round",
      strokeColor,
      strokeWidth,
    };
  }

  private addPoint(point: paper.Point) {
    if (this.path) {
      this.path.add(point);
      this.path.smooth();

      // paperEventService.emitSegmentAdded({
      //   item: this.path,
      //   point,
      //   pathOptions: this.getPathOptions(),
      // });
    }
  }
}

export const pencilTool = new PencilTool();
