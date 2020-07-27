import {
  emitOnView,
  EmitOnViewEvent,
  ItemAddedEvent,
  LayerAddedEvent,
  PathSimplifiedEvent,
  SegmentAddedEvent,
} from '../helper/event.helper';
import { createRoundLinecap } from '../helper/linecap.helper';
import { createGroup, createLayer, createPath } from '../helper/project.helper';
import paperProvider from '../providers/paper.provider';
import { toolVar } from '../store/config/store.config';
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
    const { color, size } = toolVar();

    this.path = createPath({
      options: {
        strokeColor: color,
        strokeWidth: size,
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
        const { color, size } = toolVar();

        emitOnView<SegmentAddedEvent>(EmitOnViewEvent.SEGMENT_ADDED, {
          itemID: this.path!.name,
          strokeColor: color,
          strokeWidth: size,
          segmentData: JSON.stringify({
            x: point.x,
            y: point.y,
          }),
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
