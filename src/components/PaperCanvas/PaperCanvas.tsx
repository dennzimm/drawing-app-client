import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { usePaper } from '../../hooks/usePaper.hook';
import { useStoreState } from '../../store/hooks';

interface PaperCanvasProps {}

const CANVAS_ID = `paper-canvas-${nanoid()}`;

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

const PaperCanvas: React.FC<PaperCanvasProps> = () => {
  const { currentTool } = useStoreState((state) => state.tool);
  const { isReady, updateFullViewSize } = usePaper(CANVAS_ID);

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

  return <Canvas id={CANVAS_ID} data-paper-resize="true" />;
};

export default PaperCanvas;
