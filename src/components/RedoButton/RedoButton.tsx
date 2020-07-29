import { arrowRedoCircleOutline } from 'ionicons/icons';
import React from 'react';
import IconButton from '../IconButton';

export interface RedoButtonProps {}

const RedoButton: React.FC<RedoButtonProps> = () => {
  return (
    <IconButton
      // buttonProps={{ onClick: redo, disabled: !redoAvailable }}
      iconProps={{ icon: arrowRedoCircleOutline }}
    />
  );
};

export default RedoButton;
