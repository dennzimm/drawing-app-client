import { paperProvider } from "../providers";
import { createPath, createLayer, createGroup } from "./project.helper";

export enum SegmentEvents {
  SEGMENT_ADDED = "event::segment-added",
}

export interface SegmentAddedEvent {
  layerID?: Nullable<string>;
  groupID: string;
  itemID: string;
  strokeColor?: Nullable<string>;
  fillColor?: Nullable<string>;
  strokeWidth?: Nullable<number>;
  segmentData: {
    x: number;
    y: number;
  };
}

export function emitSegmentAdded(event: SegmentAddedEvent) {
  paperProvider.view.emit(SegmentEvents.SEGMENT_ADDED, event);
}

export function handleSegmentAdded(segmentAddedData: SegmentAddedEvent) {
  const {
    layerID,
    groupID,
    itemID,
    segmentData: { x, y },
    ...rest
  } = segmentAddedData;

  let layer = paperProvider.project.getItem({
    name: layerID || undefined,
  }) as paper.Layer;

  let group = paperProvider.project.getItem({
    name: groupID || undefined,
  }) as paper.Group;

  let path = paperProvider.project.getItem({
    name: itemID || undefined,
  }) as paper.Path;

  if (!layer) {
    layer = createLayer({ name: layerID || undefined });
  }

  if (!group) {
    group = createGroup({
      name: groupID || undefined,
      options: {
        layer,
      },
    });

    layer.addChild(group);
  }

  if (!path) {
    path = createPath({
      name: itemID || undefined,
      options: {
        ...rest,
      },
    });

    group.addChild(path);
  }

  path.addSegments([
    new paperProvider.scope.Segment({
      point: [x, y],
    }),
  ]);

  paperProvider.project.addLayer(layer);

  // const item = paperProvider.activeLayer.getItem({
  //   name: itemID,
  // }) as paper.Path;

  // if (item) {
  //   item.addSegments([
  //     new paperProvider.scope.Segment({
  //       point: [x, y],
  //     }),
  //   ]);
  // } else {
  //   paperProvider.activeLayer.addChild(
  //     createPath({
  //       options: {
  //         name: itemID,
  //         ...rest,
  //       },
  //     })
  //   );
  // }
}
