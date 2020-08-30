import { IonFabButton, IonIcon, IonPopover, IonRange } from "@ionic/react";
import { discOutline } from "ionicons/icons";
import React, { Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "../../store/hooks";

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
  const { toolSize } = useStoreState((state) => state.drawing);
  const { setToolSize } = useStoreActions((actions) => actions.drawing);

  const [showSizeSelect, setShowSizeSelect] = useState(false);

  const onSizeChange = useCallback(
    (value: number) => {
      setToolSize(value);
    },
    [setToolSize]
  );

  return (
    <Fragment>
      <IonPopover
        isOpen={showSizeSelect}
        onDidDismiss={() => setShowSizeSelect(false)}
      >
        <SizePreviewWrapper className="ion-margin-top">
          <SizePreview size={toolSize} />
        </SizePreviewWrapper>

        <IonRange
          value={toolSize}
          min={2}
          max={40}
          step={2}
          onIonChange={(e) => onSizeChange(+e.detail.value)}
        />
      </IonPopover>

      <IonFabButton onClick={() => setShowSizeSelect(true)}>
        <IonIcon icon={discOutline} />
      </IonFabButton>
    </Fragment>
  );
};

export default SizeSelectButton;
