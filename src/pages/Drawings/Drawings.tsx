/** @jsx jsx */
import { css, jsx } from '@emotion/core';
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
} from '@ionic/react';
import { nanoid } from 'nanoid';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import PageHeader from '../../components/PageHeader';

export interface DrawingsProps extends RouteComponentProps {}
const Drawings: React.FC<DrawingsProps> = ({ history }) => {
  const [drawingID, setDrawingID] = useState('');
  const [choice, setChoice] = useState('newDrawing');
  const [drawingIdError, setDrawingIdError] = useState(false);

  const startDrawing = async (e: React.FormEvent) => {
    e.preventDefault();

    if (choice === 'joinDrawing') {
      joinDrawing();
    } else {
      newDrawing();
    }
  };

  const joinDrawing = () => {
    if (!drawingID) {
      return setDrawingIdError(true);
    }

    history.push(`/drawings/${drawingID}`, { direction: 'none' });
  };

  const newDrawing = () => {
    // TODO: Check Server for ID
    const randomDrawingID = nanoid(6);
    history.push(`/drawings/${randomDrawingID}`, { direction: 'none' });
  };

  return (
    <IonPage id="drawings-page">
      <PageHeader title="Etwas zeichnen" />

      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <div css={wrapperStyles}>
                <IonImg src="assets/img/art_museum.svg" css={imageStyles} />

                <form noValidate onSubmit={startDrawing}>
                  <div css={buttonWrapperStyles}>
                    <IonSegment
                      css={segmentsStyles}
                      onIonChange={(e) => setChoice(e.detail.value!)}
                      value={choice}
                    >
                      <IonSegmentButton value="newDrawing">
                        <IonLabel>Neue Zeichnung erstellen</IonLabel>
                      </IonSegmentButton>

                      <IonSegmentButton value="joinDrawing">
                        <IonLabel>ID eingeben und beitreten</IonLabel>
                      </IonSegmentButton>
                    </IonSegment>

                    {choice === 'joinDrawing' && (
                      <Fragment>
                        <IonItem className="ion-margin-bottom">
                          <IonLabel position="floating" color="primary">
                            ID eingeben
                          </IonLabel>

                          <IonInput
                            name="drawingID"
                            type="text"
                            value={drawingID}
                            spellCheck={false}
                            autocapitalize="off"
                            onIonChange={(e) => setDrawingID(e.detail.value!)}
                            required
                          ></IonInput>
                        </IonItem>

                        {drawingIdError && (
                          <IonText color="danger">
                            <p>Bitte eine ID eingeben</p>
                          </IonText>
                        )}
                      </Fragment>
                    )}

                    <IonButton className="ion-margin-top" type="submit">
                      Los geht's!
                    </IonButton>
                  </div>
                </form>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const wrapperStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const imageStyles = css`
  max-width: 600px;
  max-height: 5000px;
  width: 90%;
  object-fit: contain;
`;

const buttonWrapperStyles = css`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
`;

const segmentsStyles = css`
  margin-bottom: 1.75rem;
`;

export default Drawings;
