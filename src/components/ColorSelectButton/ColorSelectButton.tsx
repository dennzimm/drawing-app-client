import { IonButton, IonIcon, IonPopover } from '@ionic/react';
import { radioButtonOn } from 'ionicons/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../store/hooks';
import ColorPalette from '../ColorPalette';

interface ColorSelectIconProps {
  currentColor: string;
}

const ColorSelectIcon = styled(IonIcon)<ColorSelectIconProps>`
  fill: ${({ currentColor }) => currentColor ?? 'var(--primary)'};
  color: var(--ion-color-light);
`;

const IconWrapper = styled.div`
  border-radius: 100%;
  background-color: var(--paper-background-primary);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledColorPalette = styled(ColorPalette)`
  max-height: 50vh;
`;

interface ColorSelectButtonProps {
  handleOnColorClick: (color: string) => void;
}
const ColorSelectButton: React.FC<ColorSelectButtonProps> = ({
  handleOnColorClick,
}) => {
  const currentColor = useStoreState((state) => state.tool.color);

  const [showColors, setShowColors] = useState(false);

  function onColorSelectClick() {
    setShowColors(true);
  }

  function onColorClick(color: string) {
    handleOnColorClick(color);
    setShowColors(false);
  }

  function onDidDismiss() {
    setShowColors(false);
  }

  return (
    <>
      <IonPopover isOpen={showColors} onDidDismiss={onDidDismiss}>
        <StyledColorPalette onColorClick={onColorClick} />
      </IonPopover>

      <IonButton onClick={onColorSelectClick}>
        <IconWrapper>
          <ColorSelectIcon
            slot="icon-only"
            icon={radioButtonOn}
            currentColor={currentColor}
          />
        </IconWrapper>
      </IonButton>
    </>
  );
};

export default ColorSelectButton;
