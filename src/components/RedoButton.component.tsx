import { arrowRedoCircleOutline } from 'ionicons/icons';
import React from 'react';
import IconButton from '../shared/IconButton';

interface RedoButtonProps {
  handleRedo: () => void;
  disabled?: boolean;
}

const RedoButton: React.FC<RedoButtonProps> = ({ handleRedo, disabled }) => {
  return (
    <IconButton
      buttonProps={{ onClick: handleRedo, disabled }}
      iconProps={{ icon: arrowRedoCircleOutline }}
    />
  );
};

export default RedoButton;
