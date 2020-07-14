import React, { useState } from 'react';
import ColorButton from '../components/ColorButton.component';
import { useStoreActions, useStoreState } from '../store/hooks';

export default function () {
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
    <ColorButton
      handleColorClick={handleColorClick}
      handleColorSelect={handleColorSelect}
      handleCancel={handleCancel}
      currentColor={currentColor}
      isColorSelectVisible={isColorSelectVisible}
    />
  );
}
