import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { ColorButton, SizeSelectButton, ToolSelectButton } from "..";

const StyledToolBar = styled(IonGrid)`
  position: absolute;
  bottom: 70px;
  right: 10px;
`;

const ToolBar: React.FC = () => {
  return (
    <StyledToolBar>
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
    </StyledToolBar>
  );
};

export default ToolBar;
