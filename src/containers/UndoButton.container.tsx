import React from 'react';
import UndoButton from '../components/UndoButton.component';
import { usePaperHistory } from '../hooks/usePaperHistory.hook';

export default function () {
  const { canUndo, undo: handleUndo } = usePaperHistory();

  return <UndoButton handleUndo={handleUndo} disabled={!canUndo} />;
}
