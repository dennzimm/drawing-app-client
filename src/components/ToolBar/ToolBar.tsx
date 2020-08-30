import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { ColorButton } from "../ColorButton";
import { SizeSelectButton } from "../SizeSelectButton";
import { ToolSelectButton } from "../ToolSelectButton";

const StyledToolBar = styled(IonGrid)`
  position: absolute;
  bottom: 70px;
  right: 10px;
  z-index: 10;
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
