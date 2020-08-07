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
import React from "react";
import { Route } from "react-router-dom";
import { AppStoreProvider, Menu } from "./components";
import { AppApolloProvider } from "./components/AppApolloProvider";
import RedirectToLogin from "./components/RedirectToLogin";
import { Drawing, DrawingsSelect } from "./pages";
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

  const setIsLoggedIn = useStoreActions(
    (actions) => actions.user.setIsLoggedIn
  );
  const setUsername = useStoreActions((actions) => actions.user.setUsername);

  return (
    <IonApp className={`${darkMode ? "dark-theme" : ""}`}>
      <IonReactRouter>
        <Menu />

        <IonRouterOutlet id="main">
          {/* <Route path="/tabs" render={() => <MainTabs />} /> */}
          {/* <Route path="/account" component={Account} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} /> */}
          {/* <Route path="/support" component={Support} /> */}
          {/* <Route path="/tutorial" component={Tutorial} /> */}
          <Route path="/drawings" render={() => <DrawingsSelect />} />
          <Route path="/drawings/:id" render={() => <Drawing />} />
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
          {/* <Route path="/" component={HomeOrTutorial} exact /> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
