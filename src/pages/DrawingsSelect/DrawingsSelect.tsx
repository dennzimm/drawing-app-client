import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { PageHeader } from "../../components";
import { useHistory } from "react-router";
import { nanoid } from "nanoid";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledImage = styled(IonImg)`
  max-width: 600px;
  max-height: 5000px;
  width: 90%;
  object-fit: contain;
`;
const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
`;

const StyledSegment = styled(IonSegment)`
  margin-bottom: 1.75rem;
`;

const DrawingsSelect: React.FC = () => {
  const history = useHistory();
  const [userDrawingName, setUserDrawingName] = useState("");
  const [choice, setChoice] = useState("newDrawing");

  const startDrawing = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (choice) {
      case "joinDrawing": {
        history.push(`/drawings/${userDrawingName}`);
        break;
      }
      // newDrawing & default | fallthrough
      case "newDrawing":
      default: {
        history.push(`/drawings/${nanoid()}`);
        break;
      }
    }
  };

  return (
    <IonPage id="drawings-page">
      <PageHeader title="Etwas zeichnen" />

      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <Wrapper>
                <StyledImage src="assets/img/art_museum.svg" />

                <form noValidate onSubmit={startDrawing}>
                  <ButtonWrapper>
                    <StyledSegment
                      onIonChange={(e) => setChoice(e.detail.value!)}
                      value={choice}
                    >
                      <IonSegmentButton value="newDrawing">
                        <IonLabel>Neue Zeichnung erstellen</IonLabel>
                      </IonSegmentButton>

                      <IonSegmentButton value="joinDrawing">
                        <IonLabel>ID eingeben und beitreten</IonLabel>
                      </IonSegmentButton>
                    </StyledSegment>

                    {choice === "joinDrawing" && (
                      <Fragment>
                        <IonItem className="ion-margin-bottom">
                          <IonLabel position="floating" color="primary">
                            ID eingeben
                          </IonLabel>

                          <IonInput
                            name="drawingID"
                            type="text"
                            value={userDrawingName}
                            spellCheck={false}
                            autocapitalize="off"
                            onIonChange={(e) =>
                              setUserDrawingName(e.detail.value!)
                            }
                            required
                          ></IonInput>
                        </IonItem>
                      </Fragment>
                    )}

                    <IonButton className="ion-margin-top" type="submit">
                      Los geht's!
                    </IonButton>
                  </ButtonWrapper>
                </form>
              </Wrapper>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DrawingsSelect;
