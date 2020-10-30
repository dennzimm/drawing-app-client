import { useMutation } from "@apollo/client";
import { IonAlert, IonFabButton, IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import React, { useState } from "react";
import {
  DeleteItem,
  DeleteItemVariables,
} from "../../api/@types/generated/gql-operations.types";
import { DELETE_ITEM } from "../../api/graphql/item.graphql";
import { asyncForEach, waitFor } from "../../helper";
import { PaperViewEvents } from "../../paper/@types";
import { emitOnView } from "../../paper/helper";
import { deleteAllItems } from "../../paper/helper/paper-project.helper";
import { useStoreState } from "../../store/hooks";

/**
 * DeleteButton
 *
 * This Delete button deletes the contents of a drawing.
 * The deletion process must be confirmed.
 *
 * @return {React.FC}
 */
const DeleteButton: React.FC = () => {
  const { id: userId } = useStoreState((state) => state.user);
  const { id: drawingName } = useStoreState((state) => state.drawing);

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [canTriggerDelete, setCanTriggerDelete] = useState(true);

  const [deleteItemMutation] = useMutation<DeleteItem, DeleteItemVariables>(
    DELETE_ITEM.mutation
  );

  async function handleDelete() {
    setCanTriggerDelete(false);

    const deletedItems = deleteAllItems();
    emitOnView(PaperViewEvents.REVERT_HISTORY, {});

    await asyncForEach(deletedItems, async (name) => {
      await waitFor(25);
      deleteItemMutation({
        variables: {
          user: {
            userId,
          },
          drawing: {
            drawingName,
          },
          data: {
            name,
          },
        },
      });
    });

    setCanTriggerDelete(true);
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

      <IonFabButton
        onClick={onDeleteClick}
        color="danger"
        disabled={!canTriggerDelete}
      >
        <IonIcon icon={trash} />
      </IonFabButton>
    </>
  );
};

export default DeleteButton;
