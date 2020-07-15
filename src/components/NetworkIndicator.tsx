import { IonBadge, IonIcon } from '@ionic/react';
import { cellular, cellularOutline } from 'ionicons/icons';
import React, { useMemo } from 'react';
import { useNetwork } from '../hooks/useNetwork.hook';
import { NetworkInfoEvent } from './NetworkInfo';
import styled from 'styled-components';

const StyledNetworkIndicator = styled(IonBadge)`
  border-radius: 100%;
  padding: 0.3rem 0.35rem;
`;

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
    <StyledNetworkIndicator
      onClick={showNetworkInfo}
      color={options.color}
      className="ion-margin-start ion-margin-end"
      {...badgeProps}
    >
      <IonIcon icon={options.icon} />
    </StyledNetworkIndicator>
  );
};

export default NetworkIndicator;
