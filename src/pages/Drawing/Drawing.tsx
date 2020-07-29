import {
  IonButtons,
  IonContent,
  IonFooter,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import ColorButton from '../../components/ColorButton';
import PageHeader from '../../components/PageHeader';
import SizeSelectButton from '../../components/SizeSelectButton';
import './Drawing.scss';
import DrawingCanvas from '../../components/DrawingCanvas';
import DeleteButton from '../../components/DeleteButton';
import UndoButton from '../../components/UndoButton';
import RedoButton from '../../components/RedoButton';

const Drawing: React.FC = () => {
  return (
    <IonPage>
      {/* <IonHeader>
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
      </IonHeader> */}

      <PageHeader title="Drawing">
        <IonButtons slot="end">
          <UndoButton />
          <RedoButton />
        </IonButtons>
      </PageHeader>

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

export default Drawing;
