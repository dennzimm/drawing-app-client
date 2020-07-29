import { createPath } from '../helper/project.helper';
import { emitSegmentAdded } from '../helper/segment.helper';
import paperProvider from '../providers/paper.provider';
import store from '../store';
import { Tool } from './tool';

class PencilTool extends Tool {
  // private layer: Nullable<paper.Layer> = null;
  // private group: Nullable<paper.Group> = null;
  private path: Nullable<paper.Path> = null;

  onMouseDown(event: paper.ToolEvent) {
    // this.setNewLayer();
    // this.setNewGroup();
    // this.addLinecap({ point: event.point, emit: false });
    this.setNewPath();
    this.addPoint({ point: event.point, emit: false });
    // paperProvider.project.addLayer(this.layer!);

    // emitOnView<LayerAddedEvent>(EmitOnViewEvent.LAYER_ADDED, {
    //   drawingID: 'TODO: ADD DRAWING ID',
    //   layerID: this.layer!.name,
    //   data: this.layer!.exportJSON(),
    // });
  }

  onMouseDrag(event: paper.ToolEvent) {
    if (this.path) {
      this.addPoint({ point: event.point, emit: true });
    }
  }

  onMouseUp(event: paper.ToolEvent) {
    // const addToHistory = store.getActions().history.addToHistory;

    if (this.path) {
      this.addPoint({ point: event.point });
      // this.addLinecap({ point: event.point });
      this.simplify();
      // this.deselectAll();
      // addToHistory({ id: this.layer!.name, data: this.layer!.exportJSON() });
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

    this.path = createPath({
      options: {
        strokeColor,
        strokeWidth,
      },
    });

    paperProvider.activeLayer.addChild(this.path);

    // this.group && this.group.addChild(this.path!);
  }

  private addPoint(props: { point: paper.Point; emit?: boolean }) {
    if (this.path) {
      const { point, emit = false } = props;

      this.path.add(point);

      if (emit) {
        const drawingState = store.getState().drawing;
        const strokeColor = drawingState.currentToolColor;
        const strokeWidth = drawingState.currentToolSize;

        emitSegmentAdded({
          itemID: this.path!.name,
          strokeColor,
          strokeWidth,
          segmentData: {
            x: point.x,
            y: point.y,
          },
        });
      }
    }
  }

  // private addLinecap(props: { point: paper.Point; emit?: boolean }) {
  //   const { point, emit = false } = props;
  //   const { color, size } = toolVar();

  //   const linecap = createRoundLinecap({
  //     point,
  //     color,
  //     width: size,
  //     group: this.group!,
  //   });

  //   if (this.group) {
  //     this.group.addChild(linecap);
  //   }

  //   // if (emit) {
  //   //   emitOnView<ItemAddedEvent>(EmitOnViewEvent.ITEM_ADDED, {
  //   //     drawingID: 'TODO: ADD DRAWING ID',
  //   //     itemID: linecap.name,
  //   //     data: linecap.exportJSON(),
  //   //   });
  //   // }
  // }

  private simplify(props: { tolerance?: number; emit?: boolean } = {}) {
    if (this.path) {
      const { tolerance, emit } = props;

      this.path.simplify(tolerance);

      // if (emit) {
      //   emitOnView<PathSimplifiedEvent>(EmitOnViewEvent.PATH_SIMPLIFIED, {
      //     drawingID: 'TODO: ADD DRAWING ID',
      //     itemID: this.path.name,
      //   });
      // }
    }
  }
}

const pencilTool = new PencilTool();

export default pencilTool;
