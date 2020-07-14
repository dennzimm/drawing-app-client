import { IonPopover, IonRange } from '@ionic/react';
import { discOutline } from 'ionicons/icons';
import React from 'react';
import styled from 'styled-components';
import IconButton from '../shared/IconButton';

interface SizePreviewProps {
  size: number;
}

const SizePreviewWrapper = styled.div<SizePreviewProps>`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
  border: 2px solid var(--ion-color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const SizePreview = styled.div<SizePreviewProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-color: var(--ion-color-dark);
  border-radius: 100%;
`;

interface SizeSelectButtonProps {
  handleSizeSelect: (value: number) => void;
  handleSizeSelectClick: () => void;
  handleCancel: () => void;
  currentSize: number;
  isSizeSelectVisible?: boolean;
}

const SizeSelectButton: React.FC<SizeSelectButtonProps> = ({
  handleSizeSelect,
  handleSizeSelectClick,
  handleCancel,
  currentSize,
  isSizeSelectVisible,
}) => {
  return (
    <>
      <IonPopover isOpen={!!isSizeSelectVisible} onDidDismiss={handleCancel}>
        <SizePreviewWrapper size={currentSize} className="ion-margin-top">
          <SizePreview size={currentSize} />
        </SizePreviewWrapper>

        <IonRange
          value={currentSize}
          min={2}
          max={40}
          step={2}
          onIonChange={(e) => handleSizeSelect(+e.detail.value)}
        />
      </IonPopover>

      <IconButton
        buttonProps={{ onClick: handleSizeSelectClick }}
        iconProps={{ icon: discOutline, color: 'dark' }}
      />
    </>
  );
};

export default SizeSelectButton;
