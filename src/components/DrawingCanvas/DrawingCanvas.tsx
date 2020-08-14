import { nanoid } from "nanoid";
import React, { useRef } from "react";
import styled from "styled-components";
import { usePaper } from "../../paper/hooks";
import { useStoreState } from "../../store/hooks";

const StyledCanvas = styled.canvas<{ backgroundColor: string }>`
  width: 100vw;
  height: 100vh;
  background: ${({ backgroundColor }) => backgroundColor};
`;

interface DrawingCanvasProps {
  drawingID: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ drawingID }) => {
  const canvasID = useRef(nanoid());
  const backgroundColor = useStoreState(
    (state) => state.drawing.backgroundColor
  );

  usePaper({ id: canvasID.current, injectGlobal: true });

  return (
    <StyledCanvas
      id={canvasID.current}
      data-paper-resize="true"
      backgroundColor={backgroundColor}
    />
  );
};

export default DrawingCanvas;
