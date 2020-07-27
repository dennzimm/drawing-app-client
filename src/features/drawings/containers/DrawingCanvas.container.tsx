import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import DrawingCanvas from '../components/DrawingCanvas.component';

interface DrawingCanvasRouterParams {
  drawingID: string;
}

export default function () {
  const { drawingID } = useParams<DrawingCanvasRouterParams>();
  const [userID] = useState(nanoid());

  return <DrawingCanvas drawingID={drawingID} userID={userID} />;
}
