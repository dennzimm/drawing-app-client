import { IonFabButton, IonIcon } from "@ionic/react";
import { arrowRedoCircleOutline } from "ionicons/icons";
import React, { ComponentProps } from "react";

export interface RedoButtonProps extends ComponentProps<typeof IonFabButton> {}

const RedoButton: React.FC<RedoButtonProps> = (props) => {
  return (
    <IonFabButton {...props}>
      <IonIcon icon={arrowRedoCircleOutline} />
    </IonFabButton>
  );
};

export default RedoButton;
