import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppStoreProvider, Menu, RedirectToLogin } from "./components";
import { AppApolloProvider } from "./components/AppApolloProvider";
import { Drawing, DrawingsSelect, UnderConstruction } from "./pages";
import { useStoreActions, useStoreState } from "./store/hooks";
import "./theme/global.css";
import "./theme/variables.css";

const App: React.FC = () => {
  return (
    <AppApolloProvider>
      <AppStoreProvider>
        <IonicApp />
      </AppStoreProvider>
    </AppApolloProvider>
  );
};

const IonicApp: React.FC = () => {
  const darkMode = useStoreState((state) => state.user.darkMode);

  const loadUserData = useStoreActions((actions) => actions.user.loadUserData);

  const setIsLoggedIn = useStoreActions(
    (actions) => actions.user.setIsLoggedIn
  );

  const setUsername = useStoreActions((actions) => actions.user.setUsername);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <IonApp className={`${darkMode ? "dark-theme" : ""}`}>
      <IonReactRouter>
        <Menu />

        <IonRouterOutlet id="main">
          {/* Redirects */}
          <Redirect exact path="/" to="/drawings" />

          {/* Account */}
          <Route
            path="/account"
            render={() => <UnderConstruction title="Account" />}
          />
          <Route
            path="/signup"
            render={() => <UnderConstruction title="Registrieren" />}
          />
          <Route
            path="/login"
            render={() => <UnderConstruction title="Anmelden" />}
          />
          <Route
            path="/logout"
            render={() => {
              return (
                <RedirectToLogin
                  setIsLoggedIn={setIsLoggedIn}
                  setUsername={setUsername}
                />
              );
            }}
          />

          {/* Tutorial */}
          <Route
            path="/tutorial"
            render={() => <UnderConstruction title="Tutorial" />}
          />
          {/* <Route path="/" component={HomeOrTutorial} exact /> */}

          {/* Drawings */}
          <Route exact path="/drawings" render={() => <DrawingsSelect />} />
          <Route exact path="/drawings/:id" component={Drawing} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
