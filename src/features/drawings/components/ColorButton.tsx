import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { IonButton, IonIcon, IonPopover } from '@ionic/react';
import { radioButtonOn } from 'ionicons/icons';
import React, { useState } from 'react';
import { GET_TOOL_OPTIONS } from '../store/operations/queries/tool.queries';
import ColorPalette from './ColorPalette';
import { toolMutations } from '../store/operations/mutations';

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
  const { data: toolOptions } = useQuery(GET_TOOL_OPTIONS);
  const currentColor = toolOptions.tool.color;
  const { setColor } = toolMutations;

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
