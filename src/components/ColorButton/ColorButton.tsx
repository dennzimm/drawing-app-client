import { IonFabButton, IonIcon, IonPopover } from "@ionic/react";
import { colorPalette } from "ionicons/icons";
import React, { Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { ColorPalette } from "../ColorPalette";

const StyledFab = styled(IonFabButton)<Record<"currentColor", string>>`
  --background: ${({ currentColor }) => currentColor};
`;

const ColorButton: React.FC = () => {
  const currentColor = useStoreState((state) => state.drawing.currentToolColor);

  const setColor = useStoreActions(
    (actions) => actions.drawing.setCurrentToolColor
  );

  const eraserSelected = useStoreState((state) => state.drawing.eraserSelected);

  const [showColorSelect, setShowColorSelect] = useState(false);

  const onColorClick = () => {
    setShowColorSelect(true);
  };

  const onDidDismiss = () => {
    setShowColorSelect(false);
  };

  const onColorSelect = useCallback(
    (color: string) => {
      setColor(color);
      setShowColorSelect(false);
    },
    [setColor]
  );

  return (
    <Fragment>
      <IonPopover isOpen={showColorSelect} onDidDismiss={onDidDismiss}>
        <ColorPalette onColorSelect={onColorSelect} />
      </IonPopover>

      <StyledFab
        onClick={onColorClick}
        currentColor={currentColor}
        disabled={eraserSelected}
      >
        <IonIcon icon={colorPalette} />
      </StyledFab>
    </Fragment>
  );
};

export default ColorButton;
