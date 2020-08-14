import { IonButton } from "@ionic/react";
import { arrowRedoCircleOutline } from "ionicons/icons";
import React, { ComponentProps } from "react";
import { IconButton } from "../IconButton";

export interface RedoButtonProps extends ComponentProps<typeof IonButton> {}

const RedoButton: React.FC<RedoButtonProps> = (props) => {
  return (
    <IconButton
      iconProps={{ icon: arrowRedoCircleOutline }}
      buttonProps={props}
    />
  );
};

export default RedoButton;
