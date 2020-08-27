// !!WIP
import {
  IonAlert,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useStoreActions, useStoreState } from "../../store/hooks";
import "./Account.scss";

const Account: React.FC = () => {
  const username = useStoreState((state) => state.user.username);

  const setUsernameAction = useStoreActions(
    (actions) => actions.user.setUsername
  );

  const [showAlert, setShowAlert] = useState(false);

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`);
  };

  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {username && (
          <div className="ion-padding-top ion-text-center">
            <img
              src="https://www.gravatar.com/avatar?d=mm&s=140"
              alt="avatar"
            />
            <h2>{username}</h2>
            <IonList inset>
              <IonItem onClick={() => clicked("Update Picture")}>
                Update Picture
              </IonItem>
              <IonItem onClick={() => setShowAlert(true)}>
                Change Username
              </IonItem>
              <IonItem onClick={() => clicked("Change Password")}>
                Change Password
              </IonItem>
              <IonItem routerLink="/support" routerDirection="none">
                Support
              </IonItem>
              <IonItem routerLink="/logout" routerDirection="none">
                Logout
              </IonItem>
            </IonList>
          </div>
        )}
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        header="Change Username"
        buttons={[
          "Cancel",
          {
            text: "Ok",
            handler: (data) => {
              setUsernameAction(data.username);
            },
          },
        ]}
        inputs={[
          {
            type: "text",
            name: "username",
            value: username,
            placeholder: "username",
          },
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />
    </IonPage>
  );
};

export default Account;
