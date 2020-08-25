import { IonCol, IonRow } from "@ionic/react";
import React, { Fragment } from "react";
import { usePaperHistory } from "../../paper/hooks/usePaperHistory.hook";
import { RedoButton } from "../RedoButton";
import { UndoButton } from "../UndoButton";

const PaperHistory: React.FC = () => {
  const { canUndo, canRedo, undoAddItem, redoAddItem } = usePaperHistory();

  return (
    <Fragment>
      <IonRow>
        <IonCol>
          <UndoButton disabled={!canUndo} onClick={undoAddItem} />
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <RedoButton disabled={!canRedo} onClick={redoAddItem} />
        </IonCol>
      </IonRow>
    </Fragment>
  );
};

export default PaperHistory;
