import { nanoid } from 'nanoid';
import React from 'react';
import { usePaper } from '../../hooks/usePaper.hook';
import './PaperCanvas.css';

interface PaperCanvasProps {}

const CANVAS_ID = `paper-canvas-${nanoid()}`;

const PaperCanvas: React.FC<PaperCanvasProps> = () => {
  usePaper(CANVAS_ID);

  return (
    <canvas
      id={CANVAS_ID}
      data-paper-resize="true"
      style={{ width: '100%', height: '100%' }}
    ></canvas>
  );
};

export default PaperCanvas;
