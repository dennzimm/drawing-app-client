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
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import ConfiguredApolloProvider from './apollo';
import drawingsConfig from './features/drawings/config/drawings.config';
import Home from './pages/Home';
import './theme/global.css';
import './theme/variables.css';

const routes: RouteProps[] = [
  ...drawingsConfig.routes,
  {
    path: '/',
    component: Home,
    exact: true,
  },
];

const IonicApp: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
        <Redirect to="/" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

const App: React.FC = () => (
  <ConfiguredApolloProvider>
    <IonicApp />
  </ConfiguredApolloProvider>
);

export default App;
