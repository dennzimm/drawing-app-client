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
import { useParams } from 'react-router';

export interface DrawingRouterParams {
  drawingID: string;
}

const Drawing: React.FC = () => {
  const { drawingID } = useParams<DrawingRouterParams>();

  return (
    <IonPage>
      <PageHeader title={`ID: ${drawingID}`}>
        <IonButtons slot="end">
          <UndoButton />
          <RedoButton />

          {/* <NetworkIndicator badgeProps={{ slot: 'end' }} /> */}
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
