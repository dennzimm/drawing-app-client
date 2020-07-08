import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { colorPalette } from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import PaperCanvas from '../components/PaperCanvas';

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
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* <Canvas /> */}
        <PaperCanvas />
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" icon={colorPalette} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default DrawingArea;
