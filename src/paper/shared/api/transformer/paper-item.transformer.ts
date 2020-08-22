import { PointInput } from "../../../../api/@types/generated/gql-operations.types";

export const transformPaperPoint = (point: paper.Point): PointInput => {
  return {
    x: point.x,
    y: point.y,
    angle: point.angle,
    angleInRadians: point.angleInRadians,
    length: point.length,
    quadrant: point.quadrant,
  };
};
