import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import { Drawing } from "../Drawing";
import { DrawingsSelect } from "../DrawingsSelect";

const Drawings: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route path="/drawings" render={() => <DrawingsSelect />} exact={true} />
      <Route path="/drawings/:id" render={() => <Drawing />} exact={true} />
    </IonRouterOutlet>
  );
};

export default Drawings;
