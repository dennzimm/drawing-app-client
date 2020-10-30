import {
  IonButtons,
  IonContent,
  IonLoading,
  IonPage,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ActionBar } from "../../components/ActionBar";
import { DrawingArea } from "../../components/DrawingArea";
import { PageHeader } from "../../components/PageHeader";
import { ServerStatus } from "../../components/ServerStatus";
import { ToolBar } from "../../components/ToolBar";
import { DEBUG } from "../../constants";
import { deleteAllItems, emitOnView } from "../../paper/helper";
import {
  useFetchOrCreateDrawing,
  usePaperDrawingApiEvents,
  usePaperDrawingApiSubscriptions,
} from "../../paper/shared/api/hooks";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { PaperViewEvents } from "../../paper/@types";

/**
 * Drawing
 *
 * The Drawing page / view of this application.
 * This page is used to combine the components needed for
 * the drawing area / drawing experience.
 *
 * In addition, various defaults are set (also in store)
 * and functions executed when this view is entered
 * (e.g. triggerFetchOrCreateDrawing, or subscribeAllSubscriptions).
 *
 * Furthermore a cleanup is provided when leaving this view
 * (useIonViewWillLeave).
 *
 * As long as the initial fetch of drawing data is executed (or a refetch),
 * a loading indicator is displayed.
 *
 * @return {React.FC}
 */
const Drawing: React.FC = () => {
  const { id: drawingName } = useParams<{ id: string }>();

  const { shouldResync } = useStoreState((state) => state.app);
  const { addToLoadingQueue, removeFromLoadingQueue } = useStoreActions(
    (actions) => actions.app
  );

  const { paperReady } = useStoreState((state) => state.drawing);
  const { setID } = useStoreActions((actions) => actions.drawing);

  const { unsubscribeAll: unsubscribeAllEvents } = usePaperDrawingApiEvents(
    drawingName
  );

  const {
    loading: fetchOrCreateLoading,
    triggerFetchOrCreateDrawing,
  } = useFetchOrCreateDrawing(drawingName);

  const {
    subscribeAll: subscribeAllSubscriptions,
    unsubscribeAll: unsubscribeAllSubscriptions,
  } = usePaperDrawingApiSubscriptions(drawingName);

  const [inView, setInView] = useState(false);

  const isLoading = useMemo(
    () => inView && (!paperReady || (fetchOrCreateLoading && !shouldResync)),
    [fetchOrCreateLoading, inView, paperReady, shouldResync]
  );

  useIonViewWillEnter(() => {
    DEBUG && console.log("drawing::ViewWillEnter -> id", drawingName);

    setInView(true);
    setID(drawingName);
    emitOnView(PaperViewEvents.RESET_HISTORY, {});
    triggerFetchOrCreateDrawing();
    subscribeAllSubscriptions(drawingName);
  }, [drawingName]);

  useIonViewWillLeave(() => {
    setInView(false);
    emitOnView(PaperViewEvents.RESET_HISTORY, {});
    unsubscribeAllSubscriptions();
    unsubscribeAllEvents();
    deleteAllItems();
    setID("");

    DEBUG && console.log("drawing::ViewDidLeave -> id", drawingName);
  }, [drawingName]);

  useEffect(() => {
    if (isLoading) {
      addToLoadingQueue("drawingPage");
    } else {
      removeFromLoadingQueue("drawingPage");
    }
  }, [addToLoadingQueue, isLoading, removeFromLoadingQueue]);

  useEffect(() => {
    if (shouldResync) {
      DEBUG && console.log("drawing::Resync");

      triggerFetchOrCreateDrawing();
    }
  }, [shouldResync, triggerFetchOrCreateDrawing]);

  return (
    <IonPage id="drawing-page">
      <IonLoading isOpen={isLoading} message={"Bitte warten..."} />

      <PageHeader>
        <IonButtons slot="end">
          <ServerStatus class="ion-margin-horizontal" />
        </IonButtons>
      </PageHeader>

      <IonContent
        fullscreen
        forceOverscroll={false}
        scrollEvents={false}
        scrollX={false}
        scrollY={false}
      >
        <ActionBar />
        <ToolBar />
        <DrawingArea />
      </IonContent>
    </IonPage>
  );
};

export default Drawing;
