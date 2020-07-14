import { IonButton, IonIcon, IonPopover } from '@ionic/react';
import { radioButtonOn } from 'ionicons/icons';
import React from 'react';
import styled from 'styled-components';
import ColorPalette from '../containers/ColorPalette.container';

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

interface ColorButtonProps {
  handleColorClick: () => void;
  handleColorSelect: (color: string) => void;
  handleCancel: () => void;
  currentColor: string;
  isColorSelectVisible?: boolean;
}

const ColorButton: React.FC<ColorButtonProps> = ({
  handleColorClick,
  handleColorSelect,
  handleCancel,
  currentColor,
  isColorSelectVisible,
}) => {
  return (
    <>
      <IonPopover isOpen={!!isColorSelectVisible} onDidDismiss={handleCancel}>
        <ColorPalette handleColorSelect={handleColorSelect} />
      </IonPopover>

      <IonButton onClick={handleColorClick}>
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

export default ColorButton;
