import { addRoundLinecap } from '../helper/linecap.helper';
import { createGroup, createLayer, createPath } from '../helper/project.helper';
import store from '../store';
import { Tool } from './tool.abstract';

class PencilTool extends Tool {
  private layer: Nullable<paper.Layer> = null;
  private path: Nullable<paper.Path> = null;
  private group: Nullable<paper.Group> = null;

  onMouseDown(event: paper.ToolEvent) {
    this.layer = createLayer();
    this.newPath();
    this.addPoint(event.point);
    this.setNewGroup();
    this.addLinecap(event.point);
    this.layer.addChild(this.group!);
  }

  onMouseDrag(event: paper.ToolEvent) {
    if (this.path) {
      this.addPoint(event.point);
    }
  }

  onMouseUp(event: paper.ToolEvent) {
    const addToHistory = store.getActions().history.addToHistory;

    if (this.path) {
      this.addPoint(event.point);
      this.addLinecap(event.point);
      this.simplify();
      this.deselectAll();

      addToHistory({ id: this.layer!.name, data: this.layer!.exportJSON() });
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

  private newPath() {
    const { paperColor, width } = store.getState().tool;

    this.path = createPath({
      options: {
        strokeColor: paperColor,
        strokeWidth: width,
      },
    });
  }

  private addPoint(point: paper.Point) {
    if (this.path) {
      this.path.add(point);
    }
  }

  private addLinecap(point: paper.Point) {
    const { paperColor, width } = store.getState().tool;

    addRoundLinecap({
      point,
      color: paperColor,
      width,
      group: this.group!,
    });
  }

  private simplify(tolerance?: number) {
    if (this.path) {
      this.path.simplify(tolerance);
    }
  }

  // private emitAddItem(item: paper.Item) {
  //   const itemAsJson = item.exportJSON();

  //   emitOnView<AddItemEvent>('event:add-item', {
  //     id: item.name,
  //     drawing: '0',
  //     data: itemAsJson,
  //   });
  // }

  // private emitAddSegment(segment: paper.Segment) {
  //   const segmentAsJson = JSON.stringify(segment);

  //   emitOnView<AddSegmentEvent>('event:add-segment', {
  //     id: this.path!.name,
  //     drawing: '0',
  //     data: segmentAsJson,
  //   });
  // }
}

export const pencilTool = new PencilTool();
