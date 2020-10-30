import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { usePaperHistory } from "../../paper/hooks";
import { DeleteButton } from "../DeleteButton";
import { RedoButton } from "../RedoButton";
import { UndoButton } from "../UndoButton";

const StyledActionBar = styled(IonGrid)`
  position: absolute;
  left: 10px;
  bottom: 14px;
  z-index: 10;
`;

/**
 * ActionBar
 *
 * This component serves as wrapper for the "UndoButton",
 * "RedoButton" and "DeleteButton.
 *
 * @return {React.FC}
 */
const ActionBar: React.FC = () => {
  const { canRedo, canUndo, redo, undo } = usePaperHistory();

  return (
    <StyledActionBar>
      <IonRow>
        <IonCol>
          <UndoButton disabled={!canUndo} onClick={undo} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <RedoButton disabled={!canRedo} onClick={redo} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <DeleteButton />
        </IonCol>
      </IonRow>
    </StyledActionBar>
  );
};

export default ActionBar;
