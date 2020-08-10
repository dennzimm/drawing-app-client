import { IonAlert } from "@ionic/react";
import { trash } from "ionicons/icons";
// import paper from 'paper';
import React, { useState } from "react";
import { paperService } from "../../paper/services";
import { IconButton } from "../IconButton";
import { useMutation } from "@apollo/client";
import { ITEM_MUTATED } from "../../api/graphql/subscriptions";
import {
  ItemMutated,
  ItemMutatedVariables,
  DeleteItem,
  DeleteItemVariables,
} from "../../api/@types/generated/gql-operations.types";
import { useParams } from "react-router";
import { useStoreState } from "../../store/hooks";
import { DELETE_ITEM } from "../../api/graphql/mutations";
// import paperProvider from '../providers/paper.provider';
// import { useStoreActions } from '../store/hooks';

const DeleteButton: React.FC = () => {
  // const setHistoryToFirst = useStoreActions(
  //   (actions) => actions.history.setCurrentToFirst
  // );

  const { id: drawingID } = useParams();

  const userID = useStoreState((state) => state.user.userID);

  const [deleteItem] = useMutation<DeleteItem, DeleteItemVariables>(
    DELETE_ITEM
  );

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function handleDelete() {
    const deletedItems = paperService.deleteOwnedItems();
    deletedItems.forEach((itemID) => {
      deleteItem({
        variables: {
          drawingID,
          userID,
          itemID,
        },
      });
    });

    // paper.project.clear();
    // setHistoryToFirst();
  }

  function onDeleteClick() {
    setIsAlertVisible(true);
  }

  function onDidDismiss() {
    setIsAlertVisible(false);
  }

  const headerText = "Eigene Zeichnung löschen?";
  const messageText =
    "Willst du wirklich deine Zeichnung löschen? Alle anderen Zeichnungen werden nicht gelöscht.";

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

      <IconButton
        buttonProps={{ onClick: onDeleteClick }}
        iconProps={{ icon: trash, color: "danger" }}
      />
    </>
  );
};

export default DeleteButton;
