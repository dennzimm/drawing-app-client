import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import {
  hammer,
  imageOutline,
  logIn,
  logOut,
  person,
  personAdd,
} from 'ionicons/icons';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useStoreState } from '../../store/hooks';
import './Menu.scss';

const routes = {
  appPages: [{ title: 'Zeichnen!', path: '/drawings', icon: imageOutline }],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: person },
    { title: 'Logout', path: '/logout', icon: logOut },
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
    { title: 'Signup', path: '/signup', icon: personAdd },
  ],
};

interface Pages {
  title: string;
  path: string;
  icon: string;
  routerDirection?: string;
}

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const history = useHistory();
  const location = useLocation();

  const isAuthenticated = useStoreState((state) => state.user.isLoggedin);
  const menuEnabled = useStoreState((state) => state.app.menuEnabled);

  function renderListItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} autoHide={false}>
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="none"
            className={
              location.pathname.startsWith(p.path) ? 'selected' : undefined
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
        <IonList lines="none">{renderListItems(routes.appPages)}</IonList>

        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated
            ? renderListItems(routes.loggedInPages)
            : renderListItems(routes.loggedOutPages)}
        </IonList>

        <IonList lines="none">
          <IonListHeader>Tutorial</IonListHeader>
          <IonItem
            button
            onClick={() => {
              history.push('/tutorial');
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
