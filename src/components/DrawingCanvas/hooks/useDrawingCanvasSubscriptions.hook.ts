import { useEffect } from "react";
import { useDrawingDataPublished } from "../../../api/hooks";
import { PaperDataHandlerFactory } from "../../../paper/factories";

export function useDrawingCanvasSubscriptions(drawingID: string) {
  const { data } = useDrawingDataPublished(drawingID);

  useEffect(() => {
    if (data) {
      const {
        drawingDataPublished: { __typename, node },
      } = data;

      const dataHandler = PaperDataHandlerFactory.build(__typename);
      dataHandler && dataHandler(node);
    }
  }, [data]);
}
