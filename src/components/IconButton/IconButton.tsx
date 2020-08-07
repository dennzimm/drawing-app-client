import { IonButton, IonIcon } from "@ionic/react";
import React from "react";

interface IconButtonProps {
  buttonProps?: React.ComponentProps<typeof IonButton>;
  iconProps?: React.ComponentProps<typeof IonIcon>;
}

const IconButton: React.FC<IconButtonProps> = ({
  buttonProps = {},
  iconProps = {},
}) => {
  return (
    <IonButton {...buttonProps}>
      <IonIcon slot="icon-only" {...iconProps} />
    </IonButton>
  );
};

export default IconButton;
