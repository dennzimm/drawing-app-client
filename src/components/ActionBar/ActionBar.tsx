import React from "react";
import styled from "styled-components";
import { ToolSelectButton, ColorButton, SizeSelectButton } from "..";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

const StyledActionBar = styled(IonGrid)`
  position: absolute;
  bottom: 70px;
  right: 10px;
`;

const ActionBar: React.FC = () => {
  return (
    <StyledActionBar>
      <IonRow>
        <IonCol>
          <SizeSelectButton />
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <ColorButton />
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <ToolSelectButton />
        </IonCol>
      </IonRow>
    </StyledActionBar>
  );
};

export default ActionBar;
