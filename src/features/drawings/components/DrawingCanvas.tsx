import styled from '@emotion/styled';
import { nanoid } from 'nanoid';
import React, { HTMLAttributes } from 'react';
import { usePaper } from '../hooks/usePaper.hook';

const CANVAS_ID = nanoid();
const DrawingCanvas: React.FC<HTMLAttributes<HTMLCanvasElement>> = (props) => {
  usePaper(CANVAS_ID);

  return <canvas id={CANVAS_ID} data-paper-resize="true" {...props} />;
};

export default styled(DrawingCanvas)`
  width: 100%;
  height: 100vh;
  background: var(--paper-background-primary);
`;
