/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { IonButton, IonIcon, IonPopover } from '@ionic/react';
import { radioButtonOn } from 'ionicons/icons';
import React, { Fragment, useState } from 'react';
import { useStoreActions, useStoreState } from '../../store/hooks';
import ColorPalette from '../ColorPalette';

const iconWrapperStyles = css`
  border-radius: 100%;
  background-color: var(--paper-background-primary);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const iconStyles = (currentColor: string) => css`
  fill: ${currentColor ?? 'var(--primary)'};
  color: var(--ion-color-dark);
`;

export interface ColorButtonProps {}

const ColorButton: React.FC<ColorButtonProps> = () => {
  const currentColor = useStoreState((state) => state.drawing.currentToolColor);
  const setColor = useStoreActions(
    (actions) => actions.drawing.setCurrentToolColor
  );

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
    <Fragment>
      <IonPopover isOpen={showColorSelect} onDidDismiss={onDidDismiss}>
        <ColorPalette onColorSelect={onColorSelect} />
      </IonPopover>

      <IonButton onClick={onColorClick}>
        <div css={iconWrapperStyles}>
          <IonIcon
            slot="icon-only"
            icon={radioButtonOn}
            css={iconStyles(currentColor)}
          />
        </div>
      </IonButton>
    </Fragment>
  );
};

export default ColorButton;
