import { IonButton, IonIcon } from '@ionic/react';
import { arrowUndoCircleOutline } from 'ionicons/icons';
import React from 'react';
import { usePaperHistory } from '../../hooks/usePaperHistory.hook';

const UndoButton: React.FC = () => {
  const { canUndo, undo } = usePaperHistory();

  return (
    <IonButton onClick={undo} disabled={!canUndo}>
      <IonIcon slot="icon-only" icon={arrowUndoCircleOutline} />
    </IonButton>
  );
};

export default UndoButton;
