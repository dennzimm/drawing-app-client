import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { PageHeader } from "../../components/PageHeader";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem 0;
`;

const StyledImage = styled(IonImg)`
  max-width: 600px;
  max-height: 5000px;
  width: 90%;
  object-fit: contain;
`;

export interface UnderConstructionProps {
  title?: string;
}

/**
 * UnderConstruction
 *
 * The UnderConstruction page / view of this application.
 * Used on not ready areas / routes to provide a more beautiful appearance.
 *
 * @param {UnderConstructionProps} { title }
 * @return {React.FC<UnderConstructionProps>}
 */
const UnderConstruction: React.FC<UnderConstructionProps> = ({ title }) => {
  return (
    <IonPage id="under-construction-page">
      <PageHeader title={title} />

      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <Wrapper>
                <StyledImage
                  src="assets/img/under_construction.svg"
                  alt="Under Construction"
                />

                <IonText class="ion-margin-top" color="secondary">
                  <h1>Hier wird noch gearbeitet...</h1>
                </IonText>
              </Wrapper>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UnderConstruction;
