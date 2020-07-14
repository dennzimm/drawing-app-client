import React from 'react';
import RedoButton from '../components/RedoButton.component';
import { usePaperHistory } from '../hooks/usePaperHistory.hook';

export default function () {
  const { canRedo, redo: handleRedo } = usePaperHistory();

  return <RedoButton handleRedo={handleRedo} disabled={!canRedo} />;
}
