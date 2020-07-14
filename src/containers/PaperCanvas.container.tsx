import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import PaperCanvas from '../components/PaperCanvas.component';
import { usePaper } from '../hooks/usePaper.hook';
import { useStoreState } from '../store/hooks';

export default function () {
  const { currentTool } = useStoreState((state) => state.tool);

  const [canvasID] = useState(`paper-canvas-${nanoid()}`);

  const { isReady, updateFullViewSize } = usePaper(canvasID);

  useEffect(() => {
    if (isReady) {
      updateFullViewSize();
    }
  }, [isReady, updateFullViewSize]);

  useEffect(() => {
    if (isReady) {
      currentTool.tool.activate();
    }
  }, [currentTool.tool, isReady]);

  return <PaperCanvas id={canvasID} />;
}
