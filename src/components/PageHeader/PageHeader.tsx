import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

export interface PageHeaderProps {
  title?: string;
}

/**
 * PageHeader
 *
 * This component represents a page header.
 * A title, an icon and additional components can be displayed
 *
 * @param {PageHeaderProps} { title, children }
 * @return {React.FC}
 */
const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => (
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>

      {title && <IonTitle>{title}</IonTitle>}

      {children}
    </IonToolbar>
  </IonHeader>
);

export default PageHeader;
