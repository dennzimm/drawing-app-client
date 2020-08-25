import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { DeleteButton, PaperHistory } from "..";

const StyledActionBar = styled(IonGrid)`
  position: absolute;
  left: 10px;
  bottom: 14px;
`;

const ActionBar: React.FC = () => {
  return (
    <StyledActionBar>
      <PaperHistory />

      <IonRow>
        <IonCol>
          <DeleteButton />
        </IonCol>
      </IonRow>
    </StyledActionBar>
  );
};

export default ActionBar;
