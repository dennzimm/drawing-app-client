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
import ColorButton from '../containers/ColorButton.container';
import DeleteButton from '../containers/DeleteButton.container';
import DrawingCanvas from '../containers/DrawingCanvas.container';
import SizeSelectButton from '../containers/SizeSelectButton.container';

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
