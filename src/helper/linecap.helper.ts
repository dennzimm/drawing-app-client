import paper from 'paper';
import { nanoid } from 'nanoid';

export interface RoundLinecapOptions {
  id?: string;
  point: paper.Point;
  color: paper.Color;
  width: number;
  layer?: Nullable<paper.Layer>;
  group?: Nullable<paper.Group>;
}

export const addRoundLinecap = ({
  id = nanoid(),
  point,
  color,
  width,
  layer,
  group,
}: RoundLinecapOptions): paper.Shape.Ellipse => {
  const ellipse = new paper.Shape.Ellipse({
    id,
    name: id,
    strokeColor: color,
    fillColor: color,
    center: point,
    radius: width / 2,
    ...(layer && { layer }),
  });

  group && group.addChild(ellipse);

  return ellipse;
};
