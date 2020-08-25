import {
  IonButtons,
  IonLoading,
  IonPage,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {
  ActionBar,
  DrawingCanvas,
  PageHeader,
  ServerStatus,
  ToolBar,
} from "../../components";
import { cleanupPaperProject } from "../../paper/helper/paper-project.helper";
import {
  useDrawingActionSubscription,
  useFetchOrCreateDrawing,
  useHistroryApiActions,
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

  const { loading, triggerFetchOrCreateDrawing } = useFetchOrCreateDrawing();

  const {
    subscribe: subscribeDrawingAction,
    unsubscribe: unsubscribeDrawingAction,
  } = useDrawingActionSubscription();

  const {
    subscribe: subscribeItemMutation,
    unsubscribe: unsubscribeItemMutation,
  } = useItemMutationSubscription();

  useIonViewWillEnter(() => {
    triggerFetchOrCreateDrawing();
    subscribeDrawingAction();
    subscribeItemMutation();
  });

  useIonViewDidLeave(() => {
    unsubscribeDrawingAction();
    unsubscribeItemMutation();
    cleanupPaperProject();
    setDrawingID("");
  });

  useHistroryApiActions();

  return (
    <IonPage>
      <PageHeader>
        <IonButtons slot="end">
          <ServerStatus class="ion-margin-horizontal" />
        </IonButtons>
      </PageHeader>

      <DrawingCanvas drawingID={drawingID} />
      <IonLoading isOpen={loading} message={"Bitte warten..."} />

      <ActionBar />
      <ToolBar />
    </IonPage>
  );
};

export default Drawing;
