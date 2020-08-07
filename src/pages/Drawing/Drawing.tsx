import {
  IonButtons,
  IonContent,
  IonFooter,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import {
  ColorButton,
  DeleteButton,
  DrawingCanvas,
  PageHeader,
  RedoButton,
  ServerStatus,
  SizeSelectButton,
  UndoButton,
} from "../../components";

const Drawing: React.FC = () => {
  return (
    <IonPage>
      <PageHeader>
        <IonButtons slot="end">
          <UndoButton />
          <RedoButton />
          <ServerStatus class="ion-margin-horizontal" />
        </IonButtons>
      </PageHeader>

      <IonContent
        fullscreen
        forceOverscroll={false}
        scrollX={false}
        scrollY={false}
      >
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
    </IonPage>
  );
};

export default Drawing;
