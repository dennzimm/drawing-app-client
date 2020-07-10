import { IonAlert, IonButton, IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons';
import React, { useState } from 'react';

interface DeleteButtonProps {
  handleOnDelete: () => void;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ handleOnDelete }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  function onDeleteButtonClick() {
    setShowDeleteAlert(true);
  }

  function onDidDismiss() {
    setShowDeleteAlert(false);
  }

  return (
    <>
      <IonAlert
        translucent
        isOpen={showDeleteAlert}
        onDidDismiss={onDidDismiss}
        header={'Eigene Zeichnung löschen?'}
        message={
          'Willst du wirklich deine Zeichnung löschen? Alle anderen Zeichnungen werden nicht gelöscht.'
        }
        buttons={[
          {
            text: 'Abbrechen',
            role: 'cancel',
          },
          {
            text: 'Ja',
            handler: handleOnDelete,
          },
        ]}
      />

      <IonButton onClick={onDeleteButtonClick}>
        <IonIcon slot="icon-only" icon={trash} color="danger" />
      </IonButton>
    </>
  );
};

export default DeleteButton;
