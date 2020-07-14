import React from 'react';
import styled from 'styled-components';

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
  return <Canvas data-paper-resize="true" {...canvasProps} />;
};

export default PaperCanvas;
