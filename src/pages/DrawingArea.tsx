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

import UndoButton from '../containers/UndoButton.container';
import RedoButton from '../containers/RedoButton.container';
import DeleteButton from '../containers/DeleteButton.container';
import ColorButton from '../containers/ColorButton.container';
import PaperCanvas from '../containers/PaperCanvas.container';
import SizeSelectButton from '../containers/SizeSelectButton.container';

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
