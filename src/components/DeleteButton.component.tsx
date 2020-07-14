import { IonAlert } from '@ionic/react';
import { trash } from 'ionicons/icons';
import React from 'react';
import IconButton from '../shared/IconButton';

interface DeleteButtonProps {
  handleDelete: () => void;
  handleDeleteClick: () => void;
  handleCancel: () => void;
  isAlertVisible?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  handleDelete,
  handleDeleteClick,
  handleCancel,
  isAlertVisible,
}) => {
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
        onDidDismiss={handleCancel}
        header={headerText}
        message={messageText}
        buttons={alertButtons}
      />

      <IconButton
        buttonProps={{ onClick: handleDeleteClick }}
        iconProps={{ icon: trash, color: 'danger' }}
      />
    </>
  );
};

export default DeleteButton;
