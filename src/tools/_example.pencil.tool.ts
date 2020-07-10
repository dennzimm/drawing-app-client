import {
  AddItemEvent,
  AddSegmentEvent,
  emitOnView,
} from '../helper/event.helper';
import { addRoundLinecap } from '../helper/linecap.helper';
import { createGroup, createPath } from '../helper/project.helper';
import store from '../store';
import { Tool } from './tool.abstract';

class PencilTool extends Tool {
  private layer: Nullable<paper.Layer> = null;
  private group: Nullable<paper.Group> = null;
  private path: Nullable<paper.Path> = null;

  onMouseDown(event: paper.ToolEvent) {
    // this.layer = createLayer();

    this.newPath();
    this.addPoint(event.point);

    // this.setNewGroup();

    this.addLinecap(event.point);

    // this.layer.addChild(this.group!);

    // this.emitExportLayer();
  }

  onMouseDrag(event: paper.ToolEvent) {
    if (this.path) {
      this.addPoint(event.point);
    }
  }

  onMouseUp(event: paper.ToolEvent) {
    if (this.path) {
      this.addPoint(event.point);
      this.addLinecap(event.point);
      this.simplify();
      this.deselectAll();

      // TODO: Add History
      // const action = new DrawAction({
      //   layer: path.layer.name,
      //   tool: store.getters.tool,
      //   points: path.segments.map((seg) => {
      //     return {
      //       x: seg._point._x,
      //       y: seg._point._y,
      //     };
      //   }),
      // });

      // history.add(action);
    }
  }

  private simplify(tolerance?: number) {
    if (this.path) {
      this.path.simplify(tolerance);
    }
  }

  private newPath() {
    const { paperColor, width } = store.getState().tool;

    this.path = createPath({
      options: {
        strokeColor: paperColor,
        strokeWidth: width,
      },
    });

    this.emitAddItem(this.path);
  }

  private addPoint(point: paper.Point) {
    if (this.path) {
      this.path.add(point);
      this.emitAddSegment(this.path.lastSegment);
    }
  }

  private setNewGroup() {
    this.group = createGroup({
      options: {
        layer: this.layer,
      },
    });

    this.path && this.group.addChild(this.path);
  }

  private addLinecap(point: paper.Point) {
    const { paperColor, width } = store.getState().tool;

    const linecap = addRoundLinecap({
      point,
      color: paperColor,
      width,
      // layer: this.layer,
      // group: this.group,
    });

    this.emitAddItem(linecap);
  }

  private emitAddItem(item: paper.Item) {
    const itemAsJson = item.exportJSON();

    emitOnView<AddItemEvent>('event:add-item', {
      id: item.name,
      drawing: '0',
      data: itemAsJson,
    });
  }

  private emitAddSegment(segment: paper.Segment) {
    const segmentAsJson = JSON.stringify(segment);

    emitOnView<AddSegmentEvent>('event:add-segment', {
      id: this.path!.name,
      drawing: '0',
      data: segmentAsJson,
    });
  }
}

export const pencilTool = new PencilTool();
