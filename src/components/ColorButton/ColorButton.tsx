import { IonButton, IonIcon, IonPopover } from "@ionic/react";
import { colorPalette } from "ionicons/icons";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { ColorPalette } from "../ColorPalette";

const StyledIcon = styled(IonIcon)<Record<"currentColor", string>>`
  fill: ${({ currentColor }) => currentColor};
  stroke-width: 1.5rem;
`;

const ColorButton: React.FC = () => {
  const currentColor = useStoreState((state) => state.drawing.currentToolColor);
  const setColor = useStoreActions(
    (actions) => actions.drawing.setCurrentToolColor
  );

  const [showColorSelect, setShowColorSelect] = useState(false);

  function onColorClick() {
    setShowColorSelect(true);
  }

  function onColorSelect(color: string) {
    setColor(color);
    setShowColorSelect(false);
  }

  function onDidDismiss() {
    setShowColorSelect(false);
  }

  return (
    <Fragment>
      <IonPopover isOpen={showColorSelect} onDidDismiss={onDidDismiss}>
        <ColorPalette onColorSelect={onColorSelect} />
      </IonPopover>

      <IonButton onClick={onColorClick}>
        <StyledIcon
          slot="icon-only"
          icon={colorPalette}
          currentColor={currentColor}
        />
      </IonButton>
    </Fragment>
  );
};

export default ColorButton;
