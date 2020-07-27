import paperProvider from '../providers/paper.provider';
import { createPath } from './project.helper';

export enum SegmentEvents {
  SEGMENT_ADDED = 'event::segment-added',
}

export interface SegmentAddedEvent {
  itemID: string;
  strokeColor?: Nullable<number[] | string>;
  fillColor?: Nullable<number[]>;
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
    itemID,
    segmentData: { x, y },
    ...rest
  } = segmentAddedData;

  const item = paperProvider.activeLayer.getItem({
    name: itemID,
  }) as paper.Path;

  if (item) {
    item.addSegments([
      new paperProvider.scope.Segment({
        point: [x, y],
      }),
    ]);
  } else {
    paperProvider.activeLayer.addChild(
      createPath({
        options: {
          name: itemID,
          ...rest,
        },
      })
    );
  }
}
