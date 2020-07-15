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
import ColorButton from '../components/ColorButton';
import DeleteButton from '../components/DeleteButton';
import NetworkIndicator from '../components/NetworkIndicator';
import PaperCanvas from '../components/PaperCanvas';
import RedoButton from '../components/RedoButton';
import SizeSelectButton from '../components/SizeSelectButton';
import UndoButton from '../components/UndoButton';
import NetworkInfo from '../components/NetworkInfo';

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

          <NetworkIndicator badgeProps={{ slot: 'end' }} />
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

      <NetworkInfo />
    </IonPage>
  );
};

export default DrawingArea;
