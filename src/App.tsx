import { ApolloProvider } from '@apollo/client';
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
import { StoreProvider } from 'easy-peasy';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import client from './graphql/apollo/apollo.client';
import DrawingArea from './pages/DrawingArea';
import Home from './pages/Home';
import store from './store';
import './theme/variables.css';

const IonicApp: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" component={Home} exact />
        <Route path="/drawing-area/:id" component={DrawingArea} exact />
        <Redirect to="/" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>
        <IonicApp />
      </ApolloProvider>
    </StoreProvider>
  );
};

export default App;
