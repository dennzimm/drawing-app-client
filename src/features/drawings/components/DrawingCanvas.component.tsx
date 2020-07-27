import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';
import { useItemsSubscription } from '../hooks/useItemsSubscription.hook';
import { usePaper } from '../hooks/usePaper.hook';
import { useViewEvents } from '../hooks/useViewEvents.hook';

interface DrawingCanvasProps extends HTMLAttributes<HTMLCanvasElement> {
  drawingID: string;
  userID: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = (props) => {
  const { drawingID, userID, ...rest } = props;

  const { isReady } = usePaper(drawingID);
  useViewEvents({ drawingID, userID, isReady });
  useItemsSubscription({ drawingID, userID, isReady });

  return <canvas id={drawingID} data-paper-resize="true" {...rest} />;
};

export default styled(DrawingCanvas)`
  width: 100%;
  height: 100vh;
  background: var(--paper-background-primary);
`;
