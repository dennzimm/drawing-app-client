import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { DeleteButton } from "../DeleteButton";
import { UndoButton } from "../UndoButton";
import { RedoButton } from "../RedoButton";
import styled from "styled-components";
import { usePaperHistory } from "../../paper/hooks";

const StyledActionBar = styled(IonGrid)`
  position: absolute;
  left: 10px;
  bottom: 14px;
  z-index: 10;
`;

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
