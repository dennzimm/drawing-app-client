import { SegmentAddedEvent, CustomItemData } from "../@types";
import { paperProvider } from "../providers";
import { paperProjectHelper } from "./paper-project.helper";
import store from "../../store";

class PaperDataHelper {
  addCustomItemData = (item: paper.Item, data: CustomItemData = {}) => {
    item.data = {
      ...item.data,
      ...data,
    };
  };

  addDefaultCustomItemData = (item: paper.Item) => {
    const userID = store.getState().user.userID;
    this.addCustomItemData(item, { immutable: false, userID });
  };

  handleSegmentAddedData(segmentAddedData: SegmentAddedEvent) {
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
      group = paperProjectHelper.createGroup({
        name: groupID || undefined,
        options: {
          layer,
        },
      });
    }

    if (!path) {
      path = paperProjectHelper.createPath({
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
}

export const paperDataHelper = new PaperDataHelper();
