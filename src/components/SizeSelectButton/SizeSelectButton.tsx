import { IonPopover, IonRange } from "@ionic/react";
import { discOutline } from "ionicons/icons";
import React, { Fragment, useState, useCallback } from "react";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { IconButton } from "../IconButton";

const SizePreviewWrapper = styled.div`
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

const SizePreview = styled.div<Record<"size", number>>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-color: var(--ion-color-dark);
  border-radius: 100%;
`;

const SizeSelectButton: React.FC = () => {
  const currentSize = useStoreState((state) => state.drawing.currentToolSize);
  const setSize = useStoreActions(
    (actions) => actions.drawing.setCurrentToolSize
  );

  const [showSizeSelect, setShowSizeSelect] = useState(false);

  const onSizeSelectClick = () => {
    setShowSizeSelect(true);
  };

  const onDidDismiss = () => {
    setShowSizeSelect(false);
  };

  const onSizeChange = useCallback(
    (value: number) => {
      setSize(value);
    },
    [setSize]
  );

  return (
    <Fragment>
      <IonPopover isOpen={showSizeSelect} onDidDismiss={onDidDismiss}>
        <SizePreviewWrapper className="ion-margin-top">
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
        iconProps={{ icon: discOutline, color: "dark" }}
      />
    </Fragment>
  );
};

export default SizeSelectButton;
