import { useMutation } from "@apollo/client";
import {
  IonButtons,
  IonContent,
  IonFooter,
  IonLoading,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import {
  CreateOrFindDrawing,
  CreateOrFindDrawingVariables,
} from "../../api/@types/generated/gql-operations.types";
import { CREATE_OR_FIND_DRAWING } from "../../api/graphql/mutations";
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
import { useStoreActions, useStoreState } from "../../store/hooks";
import { paperProvider } from "../../paper/providers";
import { paperService } from "../../paper/services";

interface DrawingProps extends RouteComponentProps<Record<"id", string>> {}

const Drawing: React.FC<DrawingProps> = ({
  match: {
    params: { id: drawingID },
  },
}) => {
  const userID = useStoreState((state) => state.user.userID);
  const ready = useStoreState((state) => state.drawing.ready);
  const setDrawingReady = useStoreActions(
    (actions) => actions.drawing.setDrawingReady
  );

  const [createOrFindDrawing] = useMutation<
    CreateOrFindDrawing,
    CreateOrFindDrawingVariables
  >(CREATE_OR_FIND_DRAWING, {
    variables: {
      createDrawingData: {
        id: drawingID,
        userID,
      },
    },
    onCompleted: () => {
      setDrawingReady(true);
    },
  });

  useEffect(() => {
    async function fetchData() {
      setDrawingReady(false);

      await createOrFindDrawing().then((response) => {
        response.data!.createOrFindDrawing.items.forEach((item) => {
          paperService.importItem(item.data);
        });
      });

      setDrawingReady(true);
    }

    fetchData();
  }, [createOrFindDrawing, setDrawingReady]);

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
        <DrawingCanvas drawingID={drawingID} />

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
