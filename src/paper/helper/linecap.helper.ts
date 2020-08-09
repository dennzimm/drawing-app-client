import { nanoid } from "nanoid";
import { RoundLinecapOptions } from "../@types";
import { paperProvider } from "../providers";

export const createRoundLinecap = (
  props: RoundLinecapOptions
): paper.Shape.Ellipse => {
  const { name = nanoid(), point, color, width } = props;

  const ellipse = new paperProvider.scope.Shape.Ellipse({
    name,
    strokeColor: color,
    fillColor: color,
    center: point,
    radius: width / 2,
  });

  return ellipse;
};
