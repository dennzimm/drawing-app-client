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
  IonText,
} from "@ionic/react";
import { nanoid } from "nanoid";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { PageHeader } from "../../components/PageHeader";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 5rem;
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

/**
 * DrawingsSelect
 *
 * The DrawingsSelect page / view of this application.
 * This page is used to combine the components needed for
 * the drawing selection.
 *
 * You can choose to create a new drawing or enter an
 * ID to load an existing drawing.
 *
 * @return {React.FC}
 */
const DrawingsSelect: React.FC = () => {
  const history = useHistory();
  const [userDrawingName, setUserDrawingName] = useState("");
  const [error, setError] = useState("");
  const [choice, setChoice] = useState("newDrawing");

  const startDrawing = async (e: React.FormEvent) => {
    e.preventDefault();

    if (choice === "joinDrawing" && !userDrawingName) {
      return setError("Bitte erst eine ID eingeben");
    }

    let id = choice === "joinDrawing" ? userDrawingName : nanoid();

    history.push(`/drawings/${id}`, { direction: "none" });
  };

  return (
    <IonPage id="drawings-select-page">
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
                          <IonLabel
                            position="floating"
                            color={error ? "danger" : "primary"}
                          >
                            ID eingeben
                          </IonLabel>

                          <IonInput
                            name="drawingID"
                            type="text"
                            value={userDrawingName}
                            spellCheck={false}
                            autocapitalize="off"
                            onIonChange={(e) => {
                              if (error) {
                                setError("");
                              }
                              setUserDrawingName(e.detail.value!);
                            }}
                            required
                          ></IonInput>
                        </IonItem>

                        {error && (
                          <IonText color="danger" className="ion-margin-bottom">
                            {error}
                          </IonText>
                        )}
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
