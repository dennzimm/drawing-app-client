import { IonRouterOutlet } from '@ionic/react';
import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import DrawingView from './views/Drawing.view';

const Drawings: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet>
      <Route path={`${match.path}/:drawingID`} exact>
        <DrawingView />
      </Route>
    </IonRouterOutlet>
  );
};

export default Drawings;
