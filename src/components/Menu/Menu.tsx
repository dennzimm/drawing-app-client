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
  brushOutline,
  homeOutline,
  libraryOutline,
  logInOutline,
  logOutOutline,
  personAddOutline,
  personOutline,
} from 'ionicons/icons';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useStoreState } from '../../store/hooks';
import './Menu.scss';

const routes = {
  appPages: [
    { title: 'Start', path: '/', icon: homeOutline },
    { title: 'Etwas Zeichnen!', path: '/drawings', icon: brushOutline },
  ],
  loggedInPages: [
    { title: 'Mein Konto', path: '/account', icon: personOutline },
    { title: 'Abmelden', path: '/logout', icon: logOutOutline },
  ],
  loggedOutPages: [
    { title: 'Anmelden', path: '/login', icon: logInOutline },
    { title: 'Konto erstellen', path: '/signup', icon: personAddOutline },
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
            className={location.pathname === p.path ? 'selected' : undefined}
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
          <IonListHeader>Konto</IonListHeader>
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
            <IonIcon slot="start" icon={libraryOutline} />
            Tutorial zeigen
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
