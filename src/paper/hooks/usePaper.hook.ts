import paper from "paper";
import { useCallback } from "react";
import { DEBUG } from "../../constants";
import { useStoreActions } from "../../store/hooks";
import { addCustomItemData, createLayer } from "../helper";
import {
  cleanupPaperProject,
  deleteAllPaperProjects,
} from "../helper/paper-project.helper";

interface UsePaperProps {
  id: string;
  injectGlobal?: boolean;
}

export function usePaper({ id, injectGlobal = false }: UsePaperProps) {
  const setPaperReady = useStoreActions(
    (actions) => actions.drawing.setPaperReady
  );

  const createInitialLayer = useCallback(() => {
    const layer = createLayer();
    addCustomItemData(layer, { immutable: true });
    paper.project.addLayer(layer);
    layer.activate();
  }, []);

  const updateFullViewSize = useCallback(() => {
    paper.view.viewSize = new paper.Size(window.innerWidth, window.innerHeight);
  }, []);

  const setupPaper = useCallback(() => {
    paper.setup(id);
    createInitialLayer();
    updateFullViewSize();

    if (injectGlobal) {
      (window as any).paper = paper;
    }

    setPaperReady(true);

    DEBUG && console.log("usePaper -> setupPaper");
  }, [createInitialLayer, id, injectGlobal, setPaperReady, updateFullViewSize]);

  const cleanupPaper = useCallback(() => {
    setPaperReady(false);

    cleanupPaperProject();
    deleteAllPaperProjects();

    if (window.paper) {
      delete (window as any).paper;
    }

    DEBUG && console.log("usePaper -> cleanup");
  }, [setPaperReady]);

  return {
    setupPaper,
    cleanupPaper,
  };
}
