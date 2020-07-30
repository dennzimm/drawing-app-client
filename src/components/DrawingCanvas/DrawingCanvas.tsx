/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { HTMLAttributes } from 'react';
import { useParams } from 'react-router';
// import { useItemsSubscription } from '../../hooks/useItemsSubscription.hook';
import { usePaper } from '../../hooks/usePaper.hook';
// import { useViewEvents } from '../../hooks/useViewEvents.hook';
import { useStoreState } from '../../store/hooks';

export interface DrawingCanvasRouterParams {
  drawingID: string;
}

export interface DrawingCanvasProps extends HTMLAttributes<HTMLCanvasElement> {}

const canvasStyles = css`
  width: 100%;
  height: 100vh;
  background: var(--ion-color-paper-background-primary);
`;

const DrawingCanvas: React.FC<DrawingCanvasProps> = (props) => {
  const { drawingID } = useParams<DrawingCanvasRouterParams>();
  const userID = useStoreState((state) => state.user.userID);

  const { isReady } = usePaper(drawingID);
  // useViewEvents({ drawingID, userID, isReady });
  // useItemsSubscription({ drawingID, userID, isReady });

  return (
    <canvas
      id={drawingID}
      data-paper-resize="true"
      css={canvasStyles}
      {...props}
    />
  );
};

export default DrawingCanvas;
