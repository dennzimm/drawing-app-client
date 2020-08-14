import { IonButton } from "@ionic/react";
import { arrowUndoCircleOutline } from "ionicons/icons";
import React, { ComponentProps } from "react";
import { IconButton } from "../IconButton";

export interface UndoButtonProps extends ComponentProps<typeof IonButton> {}

const UndoButton: React.FC<UndoButtonProps> = (props) => {
  return (
    <IconButton
      iconProps={{ icon: arrowUndoCircleOutline }}
      buttonProps={props}
    />
  );
};

export default UndoButton;
