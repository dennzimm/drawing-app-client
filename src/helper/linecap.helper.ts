import { nanoid } from 'nanoid';
import { Shape } from 'paper';

export interface RoundLinecapOptions {
  name?: string;
  point: paper.Point;
  color: paper.Color | string;
  width: number;
  layer?: paper.Layer;
  group?: paper.Group;
}

export const createRoundLinecap = (
  props: RoundLinecapOptions
): paper.Shape.Ellipse => {
  const { name = nanoid(), point, color, width, layer, group } = props;

  const ellipse = new Shape.Ellipse({
    name,
    strokeColor: color,
    fillColor: color,
    center: point,
    radius: width / 2,
    // ...(layer && { layer }),
  });

  // group && group.addChild(ellipse);

  return ellipse;
};
