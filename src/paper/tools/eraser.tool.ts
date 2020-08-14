import { BlendMode } from "../@types";
import { PencilTool } from "./pencil.tool";

export const eraserTool = new PencilTool({
  blendMode: BlendMode.DESTINATION_OUT,
});
