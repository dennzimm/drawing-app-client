import paper from "paper";
import { useCallback, useEffect, useState } from "react";
import { addCustomItemData, createLayer } from "../helper";

interface UsePaperProps {
  id: string;
  injectGlobal?: boolean;
}

export function usePaper({ id, injectGlobal = false }: UsePaperProps) {
  const [isReady, setIsReady] = useState(false);

  const createInitialLayer = useCallback(() => {
    const layer = createLayer();
    addCustomItemData(layer, { immutable: true });
    paper.project.addLayer(layer);
    layer.activate();
  }, []);

  const updateFullViewSize = useCallback(() => {
    paper.view.viewSize = new paper.Size(window.innerWidth, window.innerHeight);
  }, []);

  useEffect(() => {
    paper.setup(id);

    if (injectGlobal) {
      window.paper = paper;
    }

    createInitialLayer();
    setIsReady(true);

    return () => {
      paper.projects.forEach((project) => project.remove());

      if (window.paper) {
        delete window.paper;
      }

      setIsReady(false);

      console.log("PaperProvider -> cleanup");
    };
  }, [createInitialLayer, id, injectGlobal]);

  useEffect(() => {
    if (isReady) {
      updateFullViewSize();
    }
  }, [isReady, updateFullViewSize]);

  return {
    updateFullViewSize,
    isReady,
  };
}
