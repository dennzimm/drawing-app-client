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
import NetworkIndicator from '../components/NetworkIndicator';

import UndoButton from '../components/UndoButton';
import RedoButton from '../components/RedoButton';
import DeleteButton from '../components/DeleteButton';
import ColorButton from '../components/ColorButton';
import PaperCanvas from '../components/PaperCanvas';
import SizeSelectButton from '../components/SizeSelectButton';

interface DrawingAreaPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const DrawingArea: React.FC<DrawingAreaPageProps> = ({ match }) => {
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
            <DeleteButton />
          </IonButtons>

          <IonButtons slot="primary">
            <SizeSelectButton />
            <ColorButton />
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default DrawingArea;
