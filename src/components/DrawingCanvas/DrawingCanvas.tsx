import { nanoid } from "nanoid";
import React, { useRef } from "react";
import styled from "styled-components";
import { usePaper } from "../../paper/hooks";
import { useStoreState } from "../../store/hooks";
import { useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";

const StyledCanvas = styled.canvas<{ backgroundColor: string }>`
  width: 100%;
  height: 100%;
  background: ${({ backgroundColor }) => backgroundColor};
`;

const DrawingCanvas: React.FC = () => {
  const canvasID = useRef(nanoid());
  const backgroundColor = useStoreState(
    (state) => state.drawing.backgroundColor
  );

  const { setupPaper, cleanupPaper } = usePaper({
    id: canvasID.current,
    injectGlobal: true,
  });

  useIonViewWillEnter(() => {
    setupPaper();
  }, []);

  useIonViewWillLeave(() => {
    cleanupPaper();
  }, []);

  return (
    <StyledCanvas
      id={canvasID.current}
      data-paper-resize="true"
      backgroundColor={backgroundColor}
    />
  );
};

export default DrawingCanvas;
