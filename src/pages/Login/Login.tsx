import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import PageHeader from '../../components/PageHeader';
import { useStoreActions } from '../../store/hooks';
import './Login.scss';

interface LoginProps extends RouteComponentProps {}

const Login: React.FC<LoginProps> = ({ history }) => {
  const setIsLoggedIn = useStoreActions(
    (actions) => actions.user.setIsLoggedIn
  );
  const setUsernameAction = useStoreActions(
    (actions) => actions.user.setUsername
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (username && password) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/tabs/schedule', { direction: 'none' });
    }
  };

  return (
    <IonPage id="login-page">
      <PageHeader title="Login" />

      <IonContent>
        <div className="login-logo">
          <img src="assets/img/login.svg" alt="Welcome" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Username
              </IonLabel>
              <IonInput
                name="username"
                type="text"
                value={username}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e) => setUsername(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            {formSubmitted && usernameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Username is required</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="primary">
                Password
              </IonLabel>
              <IonInput
                name="password"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>

            {formSubmitted && passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Password is required</p>
              </IonText>
            )}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                Login
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">
                Signup
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
