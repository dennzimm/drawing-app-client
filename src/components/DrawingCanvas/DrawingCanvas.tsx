import { nanoid } from "nanoid";
import React, { useState } from "react";
import styled from "styled-components";
import { usePaper } from "../../paper/hooks";

const StyledCanvas = styled.canvas`
  width: 100vw;
  height: 100vh;
  background: var(--ion-color-paper-background-primary);
`;

interface DrawingCanvasProps {
  drawingID: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ drawingID }) => {
  const [canvasID] = useState(nanoid());

  usePaper({ id: canvasID, injectGlobal: true });

  return <StyledCanvas id={canvasID} data-paper-resize="true" />;
};

export default DrawingCanvas;
