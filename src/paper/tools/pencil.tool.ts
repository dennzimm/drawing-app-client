import store from "../../store";
import { paperDataHelper, paperProjectHelper } from "../helper";
import { paperProvider } from "../providers";
import { Tool } from "./tool";

class PencilTool extends Tool {
  // private layer: Nullable<paper.Layer> = null;
  // private group: Nullable<paper.Group> = null;
  private path: Nullable<paper.Path> = null;

  private defaultPathOptions = {
    strokeColor: store.getState().drawing.currentToolColor,
    strokeWidth: store.getState().drawing.currentToolSize,
    strokeCap: "round",
    strokeJoin: "round",
  } as const;

  onMouseDown(event: paper.ToolEvent) {
    // this.setNewLayer();
    // this.setNewGroup();
    // this.addLinecap(event.point);
    this.setNewPath();
    this.addPoint(event.point);
    // paperProvider.project.addLayer(this.layer!);
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
      // this.addLinecap(event.point);
      this.simplify();
      this.deselectAll();

      // addToHistory({ id: this.layer!.name, data: this.layer!.exportJSON() });

      paperProjectHelper.emitItemAdded({
        id: this.path!.name,
        data: this.path!.exportJSON(),
      });
    }
  }

  // private setNewLayer() {
  //   this.layer = createLayer();
  // }

  // private setNewGroup() {
  //   this.group = createGroup({
  //     options: {
  //       layer: this.layer,
  //     },
  //   });

  //   this.layer && this.layer.addChild(this.group!);
  // }

  private setNewPath() {
    const drawingState = store.getState().drawing;
    const strokeColor = drawingState.currentToolColor;
    const strokeWidth = drawingState.currentToolSize;

    this.path = paperProjectHelper.createPath({
      options: {
        ...this.defaultPathOptions,
        strokeColor,
        strokeWidth,
      },
    });

    paperDataHelper.addCustomItemData(this.path);

    // this.group && this.group.addChild(this.path!);
  }

  private addPoint(point: paper.Point) {
    if (this.path) {
      this.path.add(point);

      const drawingState = store.getState().drawing;
      const strokeColor = drawingState.currentToolColor;
      const strokeWidth = drawingState.currentToolSize;

      paperProjectHelper.emitSegmentAdded({
        layerID: paperProvider.activeLayer.name,
        // layerID: this.layer!.name,
        // groupID: this.group!.name,
        itemID: this.path!.name,
        point: {
          x: point.x,
          y: point.y,
        },
        path: {
          ...this.defaultPathOptions,
          strokeColor,
          strokeWidth,
        },
      });
    }
  }

  // private addLinecap(point: paper.Point) {
  //   const drawingState = store.getState().drawing;
  //   const color = drawingState.currentToolColor;
  //   const width = drawingState.currentToolSize;

  //   const linecap = createRoundLinecap({
  //     point,
  //     color,
  //     width,
  //   });

  //   this.group && this.group.addChild(linecap);
  // }

  private simplify(props: { tolerance?: number } = {}) {
    if (this.path) {
      const { tolerance } = props;

      this.path.simplify(tolerance);
    }
  }
}

export const pencilTool = new PencilTool();
