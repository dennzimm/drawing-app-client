import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppApolloProvider } from './apollo';
import Menu from './components/Menu';
import Drawing from './pages/Drawing';
import Drawings from './pages/Drawings';
import Login from './pages/Login/Login';
import Signup from './pages/Signup';
import { AppStoreProvider } from './store';
import { useStoreActions } from './store/hooks';
import './theme/variables.css';

const App: React.FC = () => (
  <AppStoreProvider>
    <AppApolloProvider>
      <IonicApp />
    </AppApolloProvider>
  </AppStoreProvider>
);

interface IonicAppProps {}

const IonicApp: React.FC<IonicAppProps> = () => {
  const loadUserData = useStoreActions((actions) => actions.user.loadUserData);

  const setIsLoggedIn = useStoreActions(
    (actions) => actions.user.setIsLoggedIn
  );

  const setUsername = useStoreActions((actions) => actions.user.setUsername);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <IonApp>
      <IonReactRouter>
        <Menu />

        <IonRouterOutlet id="main">
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route
            path="/logout"
            render={() => {
              setIsLoggedIn(false);
              setUsername(undefined);
              return <Redirect to="/tabs" />;
            }}
          />

          <Route path="/drawings/:drawingID" component={Drawing} exact />
          <Route path="/drawings" component={Drawings} exact />

          <Redirect to="/drawings" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
