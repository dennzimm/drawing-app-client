import { IonAlert } from '@ionic/react';
import { trash } from 'ionicons/icons';
import React, { useState } from 'react';
import paperProvider from '../providers/paper.provider';
import IconButton from '../shared/IconButton';
import { useStoreActions } from '../store/hooks';

const DeleteButton: React.FC = () => {
  const setHistoryToFirst = useStoreActions(
    (actions) => actions.history.setCurrentToFirst
  );

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function handleDelete() {
    paperProvider.clearProject();
    setHistoryToFirst();
  }

  function onDeleteClick() {
    setIsAlertVisible(true);
  }

  function onDidDismiss() {
    setIsAlertVisible(false);
  }

  const headerText = 'Eigene Zeichnung löschen?';
  const messageText =
    'Willst du wirklich deine Zeichnung löschen? Alle anderen Zeichnungen werden nicht gelöscht.';

  const alertButtons = [
    {
      text: 'Abbrechen',
      role: 'cancel',
    },
    {
      text: 'Ja',
      handler: handleDelete,
    },
  ];

  return (
    <>
      <IonAlert
        isOpen={!!isAlertVisible}
        onDidDismiss={onDidDismiss}
        header={headerText}
        message={messageText}
        buttons={alertButtons}
      />

      <IconButton
        buttonProps={{ onClick: onDeleteClick }}
        iconProps={{ icon: trash, color: 'danger' }}
      />
    </>
  );
};

export default DeleteButton;
