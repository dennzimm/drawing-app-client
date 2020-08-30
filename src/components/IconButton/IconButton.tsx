import { IonButton, IonIcon } from "@ionic/react";
import React from "react";

export interface IconButtonProps
  extends React.ComponentProps<typeof IonButton> {
  iconProps?: React.ComponentProps<typeof IonIcon>;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconProps = {},
  ...props
}) => {
  return (
    <IonButton {...props}>
      <IonIcon slot="icon-only" {...iconProps} />
    </IonButton>
  );
};

export default IconButton;
