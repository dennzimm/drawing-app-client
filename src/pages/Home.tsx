import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';

interface HomePageProps extends RouteComponentProps<{}> {}

const Home: React.FC<HomePageProps> = () => {
  const history = useHistory();

  async function generateNewDrawingID() {
    const id = nanoid(10);
    // TODO: Check if already exists

    return id;
  }

  async function startNewDrawing() {
    const id = await generateNewDrawingID();
    history.push(`/drawing-area/${id}`);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton onClick={startNewDrawing}>Start new drawing!</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
