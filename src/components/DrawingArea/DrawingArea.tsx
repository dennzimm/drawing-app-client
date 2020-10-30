import { nanoid } from "nanoid";
import React, { createRef, useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { usePaper } from "../../paper/hooks";

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  background: #365959;
`;

const DRAWING_AREA_CONSTANTS = {
  id: nanoid(),
};

/**
 * DrawingArea
 *
 * This component represents a drawing area.
 * After the component is rendered,
 * the setupPaper() function from the usePaper hook is called to
 * initialize paper.js and set default settings.
 *
 * Initially the view size should be updated (updateViewSize)
 *
 * @return {React.FC}
 */
const DrawingArea: React.FC = () => {
  const { setupPaper, cleanupPaper, updateViewSize } = usePaper({
    id: DRAWING_AREA_CONSTANTS.id,
  });

  const canvasRef = createRef<HTMLCanvasElement>();
  const [shouldWatchRef, setShouldWatchRef] = useState(true);

  useLayoutEffect(() => {
    setupPaper();

    return cleanupPaper;
  }, [cleanupPaper, setupPaper]);

  useEffect(() => {
    if (!shouldWatchRef) {
      return;
    }

    const width = canvasRef.current?.offsetWidth ?? null;
    const height = canvasRef.current?.offsetHeight ?? null;
    if (width && height) {
      setShouldWatchRef(false);
      updateViewSize(width, height);

      return;
    }
  }, [canvasRef, shouldWatchRef, updateViewSize]);

  return (
    <StyledCanvas
      ref={canvasRef}
      id={DRAWING_AREA_CONSTANTS.id}
      data-paper-resize="true"
    />
  );
};

export default DrawingArea;
