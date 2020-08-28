import {
  IonButtons,
  IonLoading,
  IonPage,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router";
import {
  ActionBar,
  DrawingCanvas,
  PageHeader,
  ServerStatus,
  ToolBar,
} from "../../components";
import { DEBUG } from "../../constants";
import {
  useDrawingActionSubscription,
  useFetchOrCreateDrawing,
  useHistroryApiActions,
  useItemMutationSubscription,
} from "../../paper/shared/api/hooks";
import { useStoreActions, useStoreState } from "../../store/hooks";

const Drawing: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [inView, setInView] = useState(false);

  const paperReady = useStoreState((state) => state.drawing.paperReady);
  const setDrawingID = useStoreActions(
    (actions) => actions.drawing.setDrawingID
  );

  const {
    loading: fetchOrCreateLoading,
    triggerFetchOrCreateDrawing,
  } = useFetchOrCreateDrawing();

  const {
    subscribe: subscribeDrawingAction,
    unsubscribe: unsubscribeDrawingAction,
  } = useDrawingActionSubscription();

  const {
    subscribe: subscribeItemMutation,
    unsubscribe: unsubscribeItemMutation,
  } = useItemMutationSubscription();

  const isLoading = useMemo(
    () => inView && (!paperReady || fetchOrCreateLoading),
    [fetchOrCreateLoading, inView, paperReady]
  );

  useIonViewWillEnter(() => {
    DEBUG && console.log("drawing::ViewWillEnter -> id", id);

    setInView(true);
    setDrawingID(id);
    triggerFetchOrCreateDrawing(id);
    subscribeDrawingAction(id);
    subscribeItemMutation(id);
  }, [id]);

  useIonViewDidLeave(() => {
    setInView(false);
    unsubscribeDrawingAction();
    unsubscribeItemMutation();
    setDrawingID("");

    DEBUG && console.log("drawing::ViewDidLeave -> id", id);
  }, [id]);

  useHistroryApiActions();

  return (
    <IonPage>
      <PageHeader>
        <IonButtons slot="end">
          <ServerStatus class="ion-margin-horizontal" />
        </IonButtons>
      </PageHeader>

      <DrawingCanvas />
      <IonLoading isOpen={isLoading} message={"Bitte warten..."} />

      <ActionBar />
      <ToolBar />
    </IonPage>
  );
};

export default Drawing;
