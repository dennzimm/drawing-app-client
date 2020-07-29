import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';
import { useParams } from 'react-router';
import { useItemsSubscription } from '../../hooks/useItemsSubscription.hook';
import { usePaper } from '../../hooks/usePaper.hook';
import { useViewEvents } from '../../hooks/useViewEvents.hook';
import { useStoreState } from '../../store/hooks';

export interface DrawingCanvasRouterProps {
  drawingID: string;
}

export interface DrawingCanvasProps extends HTMLAttributes<HTMLCanvasElement> {}

const Canvas = styled.canvas`
  width: 100%;
  height: 100vh;
  background: var(--ion-color-paper-background-primary);
`;

const DrawingCanvas: React.FC<DrawingCanvasProps> = (props) => {
  const { drawingID } = useParams<DrawingCanvasRouterProps>();
  const userID = useStoreState((state) => state.user.userID);

  const { isReady } = usePaper(drawingID);
  useViewEvents({ drawingID, userID, isReady });
  useItemsSubscription({ drawingID, userID, isReady });

  return <Canvas id={drawingID} data-paper-resize="true" {...props} />;
};

export default DrawingCanvas;
