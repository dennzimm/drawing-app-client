import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
import { usePaper } from "../../paper/hooks";
import { useStoreState } from "../../store/hooks";
import { useDrawingCanvasEvents, useDrawingCanvasSubscriptions } from "./hooks";

const StyledCanvas = styled.canvas`
  width: 100vw;
  height: 100vh;
  background: var(--ion-color-paper-background-primary);
`;

const canvasID = nanoid();

const DrawingCanvas: React.FC = () => {
  const userID = useStoreState((state) => state.user.userID);

  const { isReady } = usePaper({ id: canvasID, injectGlobal: true });
  // useViewEvents({ canvasID, userID, isReady });
  // useItemsSubscription({ canvasID, userID, isReady });
  useDrawingCanvasEvents(isReady);
  useDrawingCanvasSubscriptions();

  return <StyledCanvas id={canvasID} data-paper-resize="true" />;
};

export default DrawingCanvas;
