import paper from 'paper';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useStoreState } from '../store/hooks';

export interface UsePaperProps {
  id: string;
}

export function usePaper({ id }: UsePaperProps) {
  const { currentTool } = useStoreState((state) => state.tool);
  const paperReady = useRef(false);

  useLayoutEffect(() => {
    if (!paperReady.current) {
      window.paper = paper;
      paper.setup(id);

      paper.view.viewSize = new paper.Size(
        window.innerWidth,
        window.innerHeight
      );

      paperReady.current = true;
    }

    paperReady.current = true;
  }, [id]);

  useEffect(() => {
    if (paperReady.current) {
      currentTool.tool.activate();
    }
  }, [paperReady, currentTool.tool]);

  return {
    paperReady: paperReady.current,
  };
}
