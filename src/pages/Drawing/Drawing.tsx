import { IonButtons, IonContent, IonLoading, IonPage } from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {
  ActionBar,
  DrawingCanvas,
  PageHeader,
  ServerStatus,
  ToolBar,
} from "../../components";
import {
  useDrawingActionSubscription,
  useFetchOrCreateDrawing,
  useItemMutationSubscription,
} from "../../paper/shared/api/hooks";
import { useStoreActions } from "../../store/hooks";

interface DrawingProps extends RouteComponentProps<Record<"id", string>> {}

const Drawing: React.FC<DrawingProps> = ({
  match: {
    params: { id: drawingID },
  },
}) => {
  const setDrawingID = useStoreActions(
    (actions) => actions.drawing.setDrawingID
  );

  setDrawingID(drawingID);
  const { loading } = useFetchOrCreateDrawing();
  useDrawingActionSubscription();
  useItemMutationSubscription();

  return (
    <IonPage>
      <PageHeader>
        <IonButtons slot="end">
          <ServerStatus class="ion-margin-horizontal" />
        </IonButtons>
      </PageHeader>

      <IonContent
        fullscreen
        forceOverscroll={false}
        scrollX={false}
        scrollY={false}
      >
        <DrawingCanvas drawingID={drawingID} />

        <IonLoading isOpen={loading} message={"Bitte warten..."} />
      </IonContent>

      <ActionBar />
      <ToolBar />
    </IonPage>
  );
};

export default Drawing;
