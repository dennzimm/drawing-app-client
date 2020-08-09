import { Path } from "./path.types";
import { Point } from "./point.types";

export interface SegmentAddedEvent {
  layerID?: Nullable<string>;
  groupID?: Nullable<string>;
  itemID: string;
  point: Point;
  path: Path;
}
