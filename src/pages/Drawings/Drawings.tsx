import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import PageHeader from '../../components/PageHeader';
import './Drawings.scss';
import { RouteComponentProps } from 'react-router';
import { nanoid } from 'nanoid';

export interface DrawingsProps extends RouteComponentProps {}
const Drawings: React.FC<DrawingsProps> = ({ history }) => {
  const startNewDrawing = async () => {
    // TODO: Check Server for ID
    const randomDrawingID = await nanoid();

    history.push(`/drawings/${randomDrawingID}`, { direction: 'none' });
  };

  return (
    <IonPage id="drawings-page">
      <PageHeader title="Drawings" />

      <IonContent>
        <div className="drawings-logo">
          <img src="assets/img/art_museum.svg" alt="Art Museum" />

          <IonButton expand="block" onClick={startNewDrawing}>
            Neue Zeichnung erstellen
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Drawings;
