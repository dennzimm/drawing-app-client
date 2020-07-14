import { arrowUndoCircleOutline } from 'ionicons/icons';
import React from 'react';
import IconButton from '../shared/IconButton';

interface UndoButtonProps {
  handleUndo: () => void;
  disabled?: boolean;
}

const UndoButton: React.FC<UndoButtonProps> = ({ handleUndo, disabled }) => {
  return (
    <IconButton
      buttonProps={{ onClick: handleUndo, disabled }}
      iconProps={{ icon: arrowUndoCircleOutline }}
    />
  );
};

export default UndoButton;
