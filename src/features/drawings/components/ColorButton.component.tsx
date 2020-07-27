import styled from '@emotion/styled';
import { IonButton, IonIcon, IonPopover } from '@ionic/react';
import { radioButtonOn } from 'ionicons/icons';
import React, { useState } from 'react';
import ColorPalette from './ColorPalette.component';

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

export interface ColorButtonProps {
  currentColor: string;
  setColor: (color: string) => void;
}

const ColorButton: React.FC<ColorButtonProps> = (props) => {
  const { currentColor, setColor } = props;

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
    <>
      <IonPopover isOpen={showColorSelect} onDidDismiss={onDidDismiss}>
        <ColorPalette onColorSelect={onColorSelect} />
      </IonPopover>

      <IonButton onClick={onColorClick}>
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
