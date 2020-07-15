import { IonButton, IonIcon, IonPopover } from '@ionic/react';
import { radioButtonOn } from 'ionicons/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useStoreActions, useStoreState } from '../store/hooks';
import ColorPalette from './ColorPalette';

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

const ColorButton: React.FC = () => {
  const currentColor = useStoreState((state) => state.tool.color);
  const setColor = useStoreActions((actions) => actions.tool.setColor);

  const [isColorSelectVisible, setIsColorSelectVisible] = useState(false);

  function handleColorClick() {
    setIsColorSelectVisible(true);
  }

  function handleColorSelect(color: string) {
    setColor(color);
    setIsColorSelectVisible(false);
  }

  function handleCancel() {
    setIsColorSelectVisible(false);
  }

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
