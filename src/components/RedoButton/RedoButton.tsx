import { IonButton, IonIcon } from '@ionic/react';
import { arrowRedoCircleOutline } from 'ionicons/icons';
import React from 'react';
import { usePaperHistory } from '../../hooks/usePaperHistory.hook';

const RedoButton: React.FC = () => {
  const { canRedo, redo } = usePaperHistory();

  return (
    <IonButton onClick={redo} disabled={!canRedo}>
      <IonIcon slot="icon-only" icon={arrowRedoCircleOutline} />
    </IonButton>
  );
};

export default RedoButton;
