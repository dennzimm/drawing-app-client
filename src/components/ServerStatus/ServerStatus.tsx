import { IonBadge, IonIcon } from "@ionic/react";
import React, { ComponentProps, useEffect } from "react";
import styled from "styled-components";
import {
  useServerStatusCheck,
  useServerStatusColor,
  useServerStatusIcon,
  useServerStatusNotification,
} from "./hooks";

export const StyledServerStatusBadge = styled(IonBadge)`
  border-radius: 9999px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export interface ServerStatusProps extends ComponentProps<typeof IonBadge> {}

const ServerStatus: React.FC<ServerStatusProps> = (props) => {
  const { checkServerStatus, stopServerStatusCheck } = useServerStatusCheck();
  useServerStatusNotification();

  const { serverStatusColor } = useServerStatusColor();
  const { serverStatusIcon } = useServerStatusIcon();

  useEffect(() => {
    checkServerStatus();

    return () => {
      stopServerStatusCheck && stopServerStatusCheck();
    };
  }, [checkServerStatus, stopServerStatusCheck]);

  return (
    <StyledServerStatusBadge color={serverStatusColor} {...props}>
      <IonIcon icon={serverStatusIcon} size="small" />
    </StyledServerStatusBadge>
  );
};

export default ServerStatus;
