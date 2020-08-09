import { paperProvider } from "../providers";
import { SegmentAddedEvent, PaperViewEvents } from "../@types";
import { createGroup } from "./group.helper";
import { createPath } from "./path.helper";

export function emitSegmentAdded(event: SegmentAddedEvent) {
  paperProvider.view.emit(PaperViewEvents.SEGMENT_ADDED, event);

  console.log(event);
}

export function handleSegmentAdded(segmentAddedData: SegmentAddedEvent) {
  const {
    layerID,
    groupID,
    itemID,
    point,
    path: pathOptions,
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
    layer = paperProvider.activeLayer;
  }

  if (!group) {
    group = createGroup({
      name: groupID || undefined,
      options: {
        layer,
      },
    });
  }

  if (!path) {
    path = createPath({
      name: itemID || undefined,
      options: {
        ...pathOptions,
      },
    });

    group.addChild(path);
  }

  path.addSegments([
    new paperProvider.scope.Segment({
      point,
    }),
  ]);

  paperProvider.project.addLayer(layer);
}
