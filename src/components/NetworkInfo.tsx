import { IonToast } from '@ionic/react';
import React, { useEffect, useMemo, useState } from 'react';
import { NetworkStateMessages, useNetwork } from '../hooks/useNetwork.hook';

export enum NetworkInfoEvent {
  showNetworkInfo = 'showNetworkInfo',
}

const NetworkInfo: React.FC = () => {
  const { isOnline, networkState } = useNetwork();

  const options = useMemo(
    () => ({
      duration: 3000,
      message: NetworkStateMessages[networkState],
      color: isOnline ? 'success' : 'danger',
    }),
    [isOnline, networkState]
  );

  const [showNetworkInfo, setShowNetworkInfo] = useState(false);

  useEffect(() => {
    setShowNetworkInfo(true);
  }, [networkState]);

  useEffect(() => {
    const showNetworkInfo = () => {
      setShowNetworkInfo(true);
    };

    window.addEventListener(NetworkInfoEvent.showNetworkInfo, showNetworkInfo);

    return () => {
      window.removeEventListener(
        NetworkInfoEvent.showNetworkInfo,
        showNetworkInfo
      );
    };
  }, []);

  return (
    <IonToast
      position="top"
      isOpen={showNetworkInfo}
      onDidDismiss={() => setShowNetworkInfo(false)}
      message={options.message}
      color={options.color}
      duration={options.duration}
      buttons={[
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            setShowNetworkInfo(false);
          },
        },
      ]}
    />
  );
};

export default NetworkInfo;
