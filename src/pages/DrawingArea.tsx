import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import ColorSelectButton from '../components/ColorSelectButton';
import DeleteButton from '../components/DeleteButton';
import NetworkIndicator from '../components/NetworkIndicator';
import PaperCanvas from '../components/PaperCanvas';
import RedoButton from '../components/RedoButton';
import UndoButton from '../components/UndoButton';
import paperProvider from '../providers/paper.provider';
import { useStoreActions } from '../store/hooks';

interface DrawingAreaPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const DrawingArea: React.FC<DrawingAreaPageProps> = ({ match }) => {
  const setColor = useStoreActions((actions) => actions.tool.setColor);

  function handleOnDelete() {
    paperProvider.clearProject();
  }

  function handleOnColorClick(color: string) {
    setColor(color);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>

          <IonButtons slot="end">
            <UndoButton />
            <RedoButton />
          </IonButtons>

          <NetworkIndicator slot="end" />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <PaperCanvas />
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButtons slot="start">
            <DeleteButton handleOnDelete={handleOnDelete} />
          </IonButtons>

          <IonButtons slot="primary">
            <ColorSelectButton handleOnColorClick={handleOnColorClick} />
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default DrawingArea;
