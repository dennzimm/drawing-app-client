import paper from "paper";
import { useCallback } from "react";
import { DEBUG } from "../../constants";
import { useStoreActions } from "../../store/hooks";
import { addCustomItemData, createLayer } from "../helper";
import {
  deleteAllLayers,
  deleteAllPaperProjects,
} from "../helper/paper-project.helper";
import { availableTools } from "../tools";

interface UsePaperProps {
  id: string;
  injectGlobal?: boolean;
}

/**
 * usePaper
 *
 * This hook can be used to initialize paper.js and configure
 * basic settings (setupPaper()).
 *
 * The cleanupPaper() function is used to
 * reverse and clean up the setup process.
 *
 * @export
 * @param {UsePaperProps} { id, injectGlobal = false }
 * @return {setupPaper, cleanupPaper, updateViewSize}
 */
export function usePaper({ id, injectGlobal = false }: UsePaperProps) {
  const { setPaperReady } = useStoreActions((actions) => actions.drawing);

  const createInitialLayer = useCallback(() => {
    const layer = createLayer();
    addCustomItemData(layer, { immutable: true });
    paper.project.addLayer(layer);
    layer.activate();
  }, []);

  const setInitialTool = useCallback(() => {
    const initialTool = availableTools.pencil;
    initialTool.activate();
  }, []);

  const updateViewSize = useCallback(
    (
      width: number = window.innerWidth,
      height: number = window.innerHeight
    ) => {
      paper.view.viewSize = new paper.Size(width, height);

      DEBUG && console.log("usePaper -> updateViewSize");
    },
    []
  );

  const setupPaper = useCallback(() => {
    if (injectGlobal || DEBUG) {
      try {
        paper.install(window);
      } catch (err) {
        (window as any).paper = paper;
      }
    }

    paper.setup(id);
    createInitialLayer();
    setInitialTool();
    updateViewSize();

    setPaperReady(true);

    DEBUG && console.log("usePaper -> setupPaper");
  }, [
    createInitialLayer,
    id,
    injectGlobal,
    setInitialTool,
    setPaperReady,
    updateViewSize,
  ]);

  const cleanupPaper = useCallback(() => {
    if (paper && paper.project) {
      setPaperReady(false);

      deleteAllLayers();
      deleteAllPaperProjects();

      if (window.paper) {
        delete (window as any).paper;
      }

      DEBUG && console.log("usePaper -> cleanup");
    }
  }, [setPaperReady]);

  return {
    setupPaper,
    cleanupPaper,
    updateViewSize,
  };
}
