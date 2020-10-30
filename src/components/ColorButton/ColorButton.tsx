import { IonFabButton, IonIcon, IonPopover } from "@ionic/react";
import { colorPalette } from "ionicons/icons";
import React, { Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { ColorPalette } from "../ColorPalette";

const StyledFab = styled(IonFabButton)<Record<"currentColor", string>>`
  --background: ${({ currentColor }) => currentColor};
`;

/**
 * ColorButton
 *
 * A ColorButton component.
 * It is used to select a color via a popover.
 *
 * @return {React.FC}
 */
const ColorButton: React.FC = () => {
  const { toolColor, eraserSelected } = useStoreState((state) => state.drawing);
  const { setToolColor } = useStoreActions((actions) => actions.drawing);

  const [showColorSelect, setShowColorSelect] = useState(false);

  const onColorClick = useCallback(() => {
    setShowColorSelect(true);
  }, []);

  const onDidDismiss = useCallback(() => {
    setShowColorSelect(false);
  }, []);

  const onColorSelect = useCallback(
    (color: string) => {
      setToolColor(color);
      setShowColorSelect(false);
    },
    [setToolColor]
  );

  return (
    <Fragment>
      <IonPopover isOpen={showColorSelect} onDidDismiss={onDidDismiss}>
        <ColorPalette onColorSelect={onColorSelect} />
      </IonPopover>

      <StyledFab
        onClick={onColorClick}
        currentColor={toolColor}
        disabled={eraserSelected}
      >
        <IonIcon icon={colorPalette} />
      </StyledFab>
    </Fragment>
  );
};

export default ColorButton;
