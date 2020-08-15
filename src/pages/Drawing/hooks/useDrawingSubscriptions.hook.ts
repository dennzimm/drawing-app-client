import { useEffect } from "react";
import { useDrawingDataPublished } from "../../../api/hooks";
import { PaperDataHandlerFactory } from "../../../paper/factories";

export function useDrawingSubscriptions(drawingID: string) {
  const { data } = useDrawingDataPublished(drawingID);

  useEffect(() => {
    if (data) {
      const {
        drawingDataPublished: { action, node },
      } = data;

      const dataHandler = PaperDataHandlerFactory.build(action);
      dataHandler && dataHandler(node);
    }
  }, [data]);
}
