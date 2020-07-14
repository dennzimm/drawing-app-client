import React, { useState } from 'react';
import DeleteButton from '../components/DeleteButton.component';
import paperProvider from '../providers/paper.provider';
import { useStoreActions } from '../store/hooks';

export default function () {
  const setHistoryToFirst = useStoreActions(
    (actions) => actions.history.setCurrentToFirst
  );

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function handleDelete() {
    paperProvider.clearProject();
    setHistoryToFirst();
  }

  function handleDeleteClick() {
    setIsAlertVisible(true);
  }

  function handleCancel() {
    setIsAlertVisible(false);
  }

  return (
    <DeleteButton
      handleDelete={handleDelete}
      handleDeleteClick={handleDeleteClick}
      handleCancel={handleCancel}
      isAlertVisible={isAlertVisible}
    />
  );
}
