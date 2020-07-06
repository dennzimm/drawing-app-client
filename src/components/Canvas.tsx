import React, { useRef, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import paper from 'paper';
import './Canvas.css';

interface CanvasProps {}

const Canvas: React.FC<CanvasProps> = () => {
  const [canvasID] = useState(nanoid());
  // const [tool, setTool] = useState<paper.Tool>(new paper.Tool());
  // const [path, setPath] = useState<paper.Path | null>(null);

  useEffect(() => {
    window.paper = paper;
    paper.setup(canvasID);

    paper.view.viewSize = new paper.Size(
      window.innerWidth,
      window.innerHeight - 56 * 2
    );

    const layer = new paper.Layer({ name: nanoid() });
    layer.activate();

    let path: paper.Path;
    const tool = new paper.Tool();

    function onMouseDown(event: paper.ToolEvent) {
      // If we produced a path before, deselect it:
      if (path) {
        path.selected = false;
      }

      // Create a new path and set its stroke color to black:
      path = new paper.Path({
        segments: [event.point],
        strokeColor: 'black',
        // Select the path, so we can see its segment points:
      });
    }

    // While the user drags the mouse, points are added to the path
    // at the position of the mouse:
    function onMouseDrag(event: paper.ToolEvent) {
      if (path) {
        path.add(event.point);
      }
    }

    // When the mouse is released, we simplify the path:
    function onMouseUp(event: paper.ToolEvent) {
      if (path) {
        path.simplify(10);
      }
    }

    tool.onMouseDown = onMouseDown;
    tool.onMouseDrag = onMouseDrag;
    tool.onMouseUp = onMouseUp;

    return () => {
      paper.project.remove();
    };
  }, [canvasID]);

  return (
    <canvas
      id={canvasID}
      data-paper-resize="true"
      style={{ width: '100%', height: '100%' }}
    ></canvas>
  );
};

export default Canvas;
