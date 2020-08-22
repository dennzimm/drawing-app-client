import { IonButtons, IonContent, IonLoading, IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";

import {
  ActionBar,
  DrawingCanvas,
  PageHeader,
  ServerStatus,
  ToolBar,
} from "../../components";
import { useDrawingActionSubscription } from "../../paper/shared/api/hooks";
import { useStoreActions, useStoreState } from "../../store/hooks";

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
  useDrawingActionSubscription();

  const userID = useStoreState((state) => state.user.userID);
  const ready = useStoreState((state) => state.drawing.ready);
  const setDrawingReady = useStoreActions(
    (actions) => actions.drawing.setDrawingReady
  );

  // const [createOrFindDrawing] = useMutation<
  //   CreateOrFindDrawing,
  //   CreateOrFindDrawingVariables
  // >(CREATE_OR_FIND_DRAWING, {
  //   variables: {
  //     createDrawingData: {
  //       id: drawingID,
  //       userID,
  //     },
  //   },
  // onCompleted: () => {
  //   setDrawingReady(true);
  //   },
  // });

  useEffect(() => {
    async function fetchData() {
      setDrawingReady(false);

      // await createOrFindDrawing().then((response) => {
      //   response.data!.createOrFindDrawing.items.forEach((item) => {
      //     paperService.importItem(item.data);
      //   });
      // });

      setDrawingReady(true);
    }

    fetchData();
  }, [setDrawingReady]);

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

        <IonLoading isOpen={!ready} message={"Bitte warten..."} />
      </IonContent>

      <ActionBar />
      <ToolBar />
    </IonPage>
  );
};

export default Drawing;
