import { arrowRedoCircleOutline } from 'ionicons/icons';
import React from 'react';
import { usePaperHistory } from '../hooks/usePaperHistory.hook';
import IconButton from '../shared/IconButton';

const RedoButton: React.FC = () => {
  const { canRedo, redo } = usePaperHistory();

  return (
    <IconButton
      buttonProps={{ onClick: redo, disabled: !canRedo }}
      iconProps={{ icon: arrowRedoCircleOutline }}
    />
  );
};

export default RedoButton;
