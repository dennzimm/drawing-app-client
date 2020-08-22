import { IonAlert, IonFabButton, IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useStoreState } from "../../store/hooks";

const DeleteButton: React.FC = () => {
  const { id: drawingID } = useParams();

  const userID = useStoreState((state) => state.user.userID);

  // const [deleteItem] = useMutation<DeleteItem, DeleteItemVariables>(
  //   DELETE_ITEM
  // );

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function handleDelete() {
    // const deletedItems = paperService.deleteOwnedItems();
    // console.log(deletedItems);
    // deletedItems.forEach((itemID) => {
    //   // deleteItem({
    //   //   variables: {
    //   //     drawingID,
    //   //     userID,
    //   //     itemID,
    //   //   },
    //   // });
    // });
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
