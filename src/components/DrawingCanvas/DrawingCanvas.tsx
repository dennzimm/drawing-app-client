import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePaper } from "../../paper/hooks";
import { useStoreActions } from "../../store/hooks";
import { useDrawingCanvasEvents, useDrawingCanvasSubscriptions } from "./hooks";

const StyledCanvas = styled.canvas`
  width: 100vw;
  height: 100vh;
  background: var(--ion-color-paper-background-primary);
`;

const DrawingCanvas: React.FC = () => {
  const setDrawingReady = useStoreActions(
    (actions) => actions.drawing.setDrawingReady
  );

  const [canvasID] = useState(nanoid());

  const { isReady } = usePaper({ id: canvasID, injectGlobal: true });

  useEffect(() => {
    setDrawingReady(isReady);
  }, [isReady, setDrawingReady]);

  useDrawingCanvasEvents();
  useDrawingCanvasSubscriptions();

  return <StyledCanvas id={canvasID} data-paper-resize="true" />;
};

export default DrawingCanvas;
