import { IonFabButton, IonIcon } from "@ionic/react";
import { arrowUndoCircleOutline } from "ionicons/icons";
import React, { ComponentProps } from "react";

export interface UndoButtonProps extends ComponentProps<typeof IonFabButton> {}

/**
 * UndoButton
 *
 * This is a button with a undo icon.
 *
 * @param {UndoButtonProps} props
 * @return {React.FC<UndoButtonProps>}
 */
const UndoButton: React.FC<UndoButtonProps> = (props) => {
  return (
    <IonFabButton {...props}>
      <IonIcon icon={arrowUndoCircleOutline} />
    </IonFabButton>
  );
};

export default UndoButton;
