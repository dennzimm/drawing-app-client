import { useState, useEffect } from 'react';

export enum NetworkState {
  online = 'online',
  offline = 'offline',
}

export const NetworkStateMessages = <const>{
  online: 'Mit dem Server verbunden',
  offline: 'Verbindung zum Server verloren',
};

export function useNetwork() {
  function getOnlineState(): boolean {
    return window.navigator.onLine;
  }

  function getNetworkState(): NetworkState {
    const isOnline = getOnlineState();
    const networkState = isOnline ? NetworkState.online : NetworkState.offline;

    return networkState;
  }

  const [networkState, setNetworkState] = useState(getNetworkState());
  const [isOnline, setIsOnline] = useState(getOnlineState());

  const updateNetworkState = () => {
    setNetworkState(getNetworkState());
    setIsOnline(getOnlineState());
  };

  useEffect(() => {
    window.addEventListener('offline', updateNetworkState);
    window.addEventListener('online', updateNetworkState);

    return () => {
      window.removeEventListener('offline', updateNetworkState);
      window.removeEventListener('online', updateNetworkState);
    };
  });

  return {
    isOnline,
    networkState,
  };
}
