import React, { useState } from 'react';
import SizeSelectButton from '../components/SizeSelectButton.component';
import { useStoreState, useStoreActions } from '../store/hooks';

export default function () {
  const currentSize = useStoreState((state) => state.tool.width);
  const setSize = useStoreActions((actions) => actions.tool.setWidth);

  const [isSizeSelectVisible, setIsSizeSelectVisible] = useState(false);

  function handleSizeSelectClick() {
    setIsSizeSelectVisible(true);
  }

  function handleSizeSelect(value: number) {
    setSize(value);
  }

  function handleCancel() {
    setIsSizeSelectVisible(false);
  }

  return (
    <SizeSelectButton
      handleSizeSelect={handleSizeSelect}
      handleSizeSelectClick={handleSizeSelectClick}
      handleCancel={handleCancel}
      currentSize={currentSize}
      isSizeSelectVisible={isSizeSelectVisible}
    />
  );
}
