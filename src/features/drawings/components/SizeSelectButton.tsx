import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { IonPopover, IonRange } from '@ionic/react';
import { discOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import IconButton from '../../../components/IconButton';
import { toolMutations } from '../store/operations/mutations';
import { GET_TOOL_OPTIONS } from '../store/operations/queries/tool.queries';

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

const SizeSelectButton: React.FC = () => {
  const { data: toolOptions } = useQuery(GET_TOOL_OPTIONS);
  const currentSize = toolOptions.tool.size;
  const { setSize } = toolMutations;

  const [showSizeSelect, setShowSizeSelect] = useState(false);

  function onSizeSelectClick() {
    setShowSizeSelect(true);
  }

  function onSizeChange(value: number) {
    setSize(value);
  }

  function onDidDismiss() {
    setShowSizeSelect(false);
  }

  return (
    <>
      <IonPopover isOpen={showSizeSelect} onDidDismiss={onDidDismiss}>
        <SizePreviewWrapper size={currentSize} className="ion-margin-top">
          <SizePreview size={currentSize} />
        </SizePreviewWrapper>

        <IonRange
          value={currentSize}
          min={2}
          max={40}
          step={2}
          onIonChange={(e) => onSizeChange(+e.detail.value)}
        />
      </IonPopover>

      <IconButton
        buttonProps={{ onClick: onSizeSelectClick }}
        iconProps={{ icon: discOutline, color: 'dark' }}
      />
    </>
  );
};

export default SizeSelectButton;