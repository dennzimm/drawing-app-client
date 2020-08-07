import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonToggle,
} from "@ionic/react";
import {
  brushOutline,
  hammer,
  logIn,
  logOut,
  moonOutline,
  person,
  personAdd,
} from "ionicons/icons";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { useStoreActions, useStoreState } from "../../store/hooks";
import "./Menu.css";

const routes = {
  appPages: [
    // { title: "Schedule", path: "/tabs/schedule", icon: calendarOutline },
    // { title: "Speakers", path: "/tabs/speakers", icon: peopleOutline },
    // { title: "Map", path: "/tabs/map", icon: mapOutline },
    // { title: "About", path: "/tabs/about", icon: informationCircleOutline },
    { title: "Zeichnen", path: "/drawings", icon: brushOutline },
  ],
  loggedInPages: [
    { title: "Account", path: "/account", icon: person },
    // { title: "Support", path: "/support", icon: help },
    { title: "Logout", path: "/logout", icon: logOut },
  ],
  loggedOutPages: [
    { title: "Login", path: "/login", icon: logIn },
    // { title: "Support", path: "/support", icon: help },
    { title: "Signup", path: "/signup", icon: personAdd },
  ],
};

interface Pages {
  title: string;
  path: string;
  icon: string;
  routerDirection?: string;
}
// interface StateProps {
//   darkMode: boolean;
//   isAuthenticated: boolean;
//   menuEnabled: boolean;
// }

// interface DispatchProps {
//   setDarkMode: typeof setDarkMode;
// }

// interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {}

const Menu: React.FC = (
  {
    // darkMode,
    // history,
    // isAuthenticated,
    // setDarkMode,
    // menuEnabled,
  }
) => {
  const location = useLocation();
  const history = useHistory();

  const menuEnabled = useStoreState((state) => state.app.menuEnabled);
  const darkMode = useStoreState((state) => state.user.darkMode);
  const isAuthenticated = useStoreState((state) => state.user.isLoggedin);

  const setDarkMode = useStoreActions((actions) => actions.user.setDarkMode);

  function renderlistItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="none"
            className={
              location.pathname.startsWith(p.path) ? "selected" : undefined
            }
          >
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Conference</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated
            ? renderlistItems(routes.loggedInPages)
            : renderlistItems(routes.loggedOutPages)}
          <IonItem>
            <IonIcon slot="start" icon={moonOutline}></IonIcon>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              checked={darkMode}
              onClick={() => setDarkMode(!darkMode)}
            />
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader>Tutorial</IonListHeader>
          <IonItem
            button
            onClick={() => {
              history.push("/tutorial");
            }}
          >
            <IonIcon slot="start" icon={hammer} />
            Show Tutorial
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

// export default connect<{}, StateProps, {}>({
//   mapStateToProps: (state) => ({
//     darkMode: state.user.darkMode,
//     isAuthenticated: state.user.isLoggedin,
//     menuEnabled: state.data.menuEnabled,
//   }),
//   mapDispatchToProps: {
//     setDarkMode,
//   },
//   component: withRouter(Menu),
// });
