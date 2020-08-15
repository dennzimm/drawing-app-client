import { IonFabButton, IonIcon } from "@ionic/react";
import { arrowUndoCircleOutline } from "ionicons/icons";
import React, { ComponentProps } from "react";

export interface UndoButtonProps extends ComponentProps<typeof IonFabButton> {}

const UndoButton: React.FC<UndoButtonProps> = (props) => {
  return (
    <IonFabButton {...props}>
      <IonIcon icon={arrowUndoCircleOutline} />
    </IonFabButton>
  );
};

export default UndoButton;
