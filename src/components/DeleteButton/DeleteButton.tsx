import { IonAlert, IonFabButton, IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import React, { useState } from "react";
import { deleteAllItems } from "../../paper/helper/paper-project.helper";
import { paperDrawingApiService } from "../../paper/shared/api/services";
import { emitOnView } from "../../paper/helper";
import { PaperViewEvents } from "../../paper/@types";

const DeleteButton: React.FC = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function handleDelete() {
    const deletedItems = deleteAllItems((name) =>
      paperDrawingApiService.deleteItem({
        name,
      })
    );

    emitOnView(PaperViewEvents.REVERT_HISTORY, {});
    console.log(deletedItems);
  }

  function onDeleteClick() {
    setIsAlertVisible(true);
  }

  function onDidDismiss() {
    setIsAlertVisible(false);
  }

  const headerText = "Zeichnungen wirklich löschen?";
  const messageText =
    "Alle eigenen und von nicht aktiven Nutzern gemalten Zeichnungen werden gelöscht.";

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
