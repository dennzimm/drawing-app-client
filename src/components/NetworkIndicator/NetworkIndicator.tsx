import { IonBadge, IonIcon, IonToast } from '@ionic/react';
import { cellularOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';

enum NetworkState {
  online = 'online',
  offline = 'offline',
}

interface NetworkIndicatorProps
  extends Partial<React.HTMLAttributes<HTMLIonBadgeElement>> {
  networkState?: NetworkState;
}
const NetworkIndicator: React.FC<NetworkIndicatorProps> = ({
  networkState = NetworkState.offline,
  ...rest
}) => {
  const ONLINE_COLOR = 'success';
  const ONLINE_MESSAGE = 'Mit dem Server verbunden';
  const ONLINE_DURATION = 3000;
  const OFFLINE_COLOR = 'danger';
  const OFFLINE_MESSAGE = 'Es besteht keine Verbindung zum Server';
  const OFFLINE_DURATION = 10000;

  const networkOnlineOptions = {
    duration: ONLINE_DURATION,
    message: ONLINE_MESSAGE,
    color: ONLINE_COLOR,
  };

  const networkOfflineOptions = {
    duration: OFFLINE_DURATION,
    message: OFFLINE_MESSAGE,
    color: OFFLINE_COLOR,
  };

  const [networkStateOptions] = useState({
    [NetworkState.online]: networkOnlineOptions,
    [NetworkState.offline]: networkOfflineOptions,
  });

  const [showNetworkInfoToast, setShowNetworkInfoToast] = useState(false);

  useEffect(() => {
    // setShowNetworkInfoToast(true);
  }, [networkState]);

  return (
    <>
      <IonToast
        position="top"
        isOpen={showNetworkInfoToast}
        onDidDismiss={() => setShowNetworkInfoToast(false)}
        message={networkStateOptions[networkState].message}
        color={networkStateOptions[networkState].color}
        duration={networkStateOptions[networkState].duration}
        buttons={[
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              setShowNetworkInfoToast(false);
            },
          },
        ]}
      />

      <IonBadge
        onClick={() => setShowNetworkInfoToast(true)}
        color={networkStateOptions[networkState].color}
        className="ion-margin-start ion-margin-end"
        {...rest}
      >
        <IonIcon icon={cellularOutline} />
      </IonBadge>
    </>
  );
};

export default NetworkIndicator;
