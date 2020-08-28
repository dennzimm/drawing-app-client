import { IonAlert, IonFabButton, IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import React, { useState } from "react";
import { PaperViewEvents } from "../../paper/@types";
import { emitOnView } from "../../paper/helper";
import { deleteAllItems } from "../../paper/helper/paper-project.helper";
import { paperDrawingApiService } from "../../paper/shared/api/services";

const DeleteButton: React.FC = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function handleDelete() {
    const deletedItems = deleteAllItems();

    deletedItems.forEach((name) =>
      paperDrawingApiService.deleteItem({
        name,
      })
    );

    emitOnView(PaperViewEvents.REVERT_HISTORY, {});
  }

  function onDeleteClick() {
    setIsAlertVisible(true);
  }

  function onDidDismiss() {
    setIsAlertVisible(false);
  }

  const headerText = "Zeichnungen wirklich löschen?";
  const messageText = "Alle Zeichnungen werden gelöscht.";

  const alertButtons = [
    {
      text: "Abbrechen",
      role: "cancel",
    },
    {
      text: "Ja",
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

      <IonFabButton onClick={onDeleteClick} color="danger">
        <IonIcon icon={trash} />
      </IonFabButton>
    </>
  );
};

export default DeleteButton;
