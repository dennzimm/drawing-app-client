import { arrowUndoCircleOutline } from 'ionicons/icons';
import React from 'react';
import { usePaperHistory } from '../hooks/usePaperHistory.hook';
import IconButton from '../shared/IconButton';

const UndoButton: React.FC = () => {
  const { canUndo, undo } = usePaperHistory();

  return (
    <IconButton
      buttonProps={{ onClick: undo, disabled: !canUndo }}
      iconProps={{ icon: arrowUndoCircleOutline }}
    />
  );
};

export default UndoButton;
