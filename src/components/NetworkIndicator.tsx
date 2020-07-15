import { IonBadge, IonIcon } from '@ionic/react';
import { cellular, cellularOutline } from 'ionicons/icons';
import React, { useMemo } from 'react';
import { useNetwork } from '../hooks/useNetwork.hook';
import { NetworkInfoEvent } from './NetworkInfo';

interface NetworkIndicatorProps {
  badgeProps?: React.ComponentProps<typeof IonBadge>;
}

const defaultNetworkIndicatorProps: NetworkIndicatorProps = {
  badgeProps: {},
};
const NetworkIndicator: React.FC<NetworkIndicatorProps> = ({
  badgeProps,
} = defaultNetworkIndicatorProps) => {
  const { isOnline } = useNetwork();

  const options = useMemo(
    () => ({
      color: isOnline ? 'success' : 'danger',
      icon: isOnline ? cellular : cellularOutline,
    }),
    [isOnline]
  );

  function showNetworkInfo() {
    window.dispatchEvent(new CustomEvent(NetworkInfoEvent.showNetworkInfo));
  }

  return (
    <IonBadge
      onClick={showNetworkInfo}
      color={options.color}
      className="ion-margin-start ion-margin-end"
      {...badgeProps}
    >
      <IonIcon icon={options.icon} />
    </IonBadge>
  );
};

export default NetworkIndicator;
