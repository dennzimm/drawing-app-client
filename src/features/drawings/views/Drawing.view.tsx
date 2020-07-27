import React from 'react';
import DrawingCanvas from '../components/DrawingCanvas';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonFooter,
} from '@ionic/react';
import DeleteButton from '../components/DeleteButton';
import SizeSelectButton from '../components/SizeSelectButton';
import ColorButton from '../components/ColorButton';

const DrawingView: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>

          <IonButtons slot="end">
            {/* <UndoButton />
            <RedoButton /> */}
          </IonButtons>

          {/* <NetworkIndicator badgeProps={{ slot: 'end' }} /> */}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <DrawingCanvas />
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

      {/* <NetworkInfo /> */}
    </IonPage>
  );
};

export default DrawingView;
