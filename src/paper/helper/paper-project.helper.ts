import { nanoid } from "nanoid";
import {
  CreateCircleProps,
  CreateGroupProps,
  CreateLayerProps,
  CreatePathProps,
  CreateRoundLinecapProps,
} from "../@types";
import { paperProvider } from "../providers";
import { paperDataHelper } from "./paper-data.helper";

class PaperProjectHelper {
  createLayer(props: CreateLayerProps = {}) {
    const { name = nanoid(), options = {} } = props;
    const layer = new paperProvider.scope.Layer({ name, ...options });
    paperDataHelper.addDefaultCustomItemData(layer);

    return layer;
  }

  createGroup(props: CreateGroupProps = {}) {
    const { name = nanoid(), options = {} } = props;
    const group = new paperProvider.scope.Group({ name, ...options });
    paperDataHelper.addDefaultCustomItemData(group);

    return group;
  }

  createPath(props: CreatePathProps = {}) {
    const { name = nanoid(), options = {} } = props;
    const path = new paperProvider.scope.Path({ name, ...options });
    paperDataHelper.addDefaultCustomItemData(path);

    return path;
  }

  createCircle(props: CreateCircleProps = {}) {
    const { name = nanoid(), options = {} } = props;
    const circle = new paperProvider.scope.Path.Circle({ name, ...options });
    paperDataHelper.addDefaultCustomItemData(circle);

    return circle;
  }

  createRoundLinecap = (
    props: CreateRoundLinecapProps
  ): paper.Shape.Ellipse => {
    const { name = nanoid(), point, color, width } = props;

    const ellipse = new paperProvider.scope.Shape.Ellipse({
      name,
      strokeColor: color,
      fillColor: color,
      center: point,
      radius: width / 2,
    });

    paperDataHelper.addDefaultCustomItemData(ellipse);

    return ellipse;
  };
}

export const paperProjectHelper = new PaperProjectHelper();
