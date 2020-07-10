import { nanoid } from 'nanoid';
import paperProvider from '../providers/paper.provider';

export interface RoundLinecapOptions {
  id?: string;
  point: paper.Point;
  color: paper.Color | string;
  width: number;
  layer?: paper.Layer;
  group?: paper.Group;
}

export const addRoundLinecap = (
  props: RoundLinecapOptions
): paper.Shape.Ellipse => {
  const { id = nanoid(), point, color, width, layer, group } = props;

  const ellipse = new paperProvider.scope.Shape.Ellipse({
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
