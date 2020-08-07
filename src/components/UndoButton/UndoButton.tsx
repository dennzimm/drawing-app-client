import { arrowUndoCircleOutline } from "ionicons/icons";
import React from "react";
import { IconButton } from "../IconButton";

export interface UndoButtonProps {}

const UndoButton: React.FC<UndoButtonProps> = () => {
  return (
    <IconButton
      // buttonProps={{ onClick: undo, disabled: !undoAvailable }}
      iconProps={{ icon: arrowUndoCircleOutline }}
    />
  );
};

export default UndoButton;
