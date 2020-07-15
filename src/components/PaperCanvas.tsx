import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePaper } from '../hooks/usePaper.hook';
import { useStoreState } from '../store/hooks';

interface PaperCanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {}

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background: var(--paper-background-primary);
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const PaperCanvas: React.FC<PaperCanvasProps> = (canvasProps) => {
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

  return <Canvas id={canvasID} data-paper-resize="true" {...canvasProps} />;
};

export default PaperCanvas;
