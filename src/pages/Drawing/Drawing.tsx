import {
  IonButtons,
  IonContent,
  IonFooter,
  IonPage,
  IonToolbar,
  IonLoading,
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
import { useStoreState } from "../../store/hooks";

const Drawing: React.FC = () => {
  const ready = useStoreState((state) => state.drawing.ready);

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

        <IonLoading isOpen={!ready} message={"Bitte warten..."} />
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
