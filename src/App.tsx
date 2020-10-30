import { ApolloProvider } from "@apollo/client";
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
import { StoreProvider } from "easy-peasy";
import React, { useEffect } from "react";
import { Route } from "react-router";
import { client } from "./api/config";
import { Menu } from "./components/Menu";
import { Drawing } from "./pages/Drawing";
import { DrawingsOrTutorial } from "./pages/DrawingsOrTutorial";
import { DrawingsSelect } from "./pages/DrawingsSelect";
import { Tutorial } from "./pages/Tutorial";
import { UnderConstruction } from "./pages/UnderConstruction";
import store from "./store";
import { useStoreActions, useStoreState } from "./store/hooks";
import "./theme/global.css";
import "./theme/variables.css";

/**
 * App / IonicApp
 *
 * Main entry point of the application.
 * This is where routes are defined and global components are integrated.
 *
 * StoreProvider: Exposes the store to the React application,
 *                so that the components will be able to consume and
 *                interact with the store via the hooks.
 *
 * ApolloProvider: Wraps the React app and places the client on the context,
 *                 which enables you to access it from anywhere in your component tree.
 *
 * @return {React.FC}
 */
const App: React.FC = () => (
  <StoreProvider store={store}>
    <ApolloProvider client={client}>
      <IonicApp />
    </ApolloProvider>
  </StoreProvider>
);

const IonicApp: React.FC = () => {
  const { darkMode } = useStoreState((state) => state.user);
  const { loadUserData } = useStoreActions((actions) => actions.user);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <IonApp className={`${darkMode ? "dark-theme" : ""}`}>
      <IonReactRouter>
        <Menu />

        <IonRouterOutlet id="main">
          {/* Tutorial */}
          <Route path="/tutorial" render={() => <Tutorial />} />

          {/* User */}
          <Route
            exact
            path="/signup"
            render={() => <UnderConstruction title="Registrieren" />}
          />
          <Route
            exact
            path="/login"
            render={() => <UnderConstruction title="Anmelden" />}
          />

          {/* Drawings */}
          <Route exact path="/drawings/:id" render={() => <Drawing />} />
          <Route exact path="/drawings" render={() => <DrawingsSelect />} />

          {/* Redirects */}
          <Route exact path="/" render={() => <DrawingsOrTutorial />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
