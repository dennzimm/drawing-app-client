import { IonBadge, IonIcon } from "@ionic/react";
import React, { ComponentProps } from "react";
import styled from "styled-components";
import {
  useServerStatusCheck,
  useServerStatusColor,
  useServerStatusIcon,
  useServerStatusNotification,
} from "./hooks";

const StyledBadge = styled(IonBadge)`
  border-radius: 9999px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export interface ServerStatusProps extends ComponentProps<typeof IonBadge> {}

const ServerStatus: React.FC<ServerStatusProps> = (props) => {
  useServerStatusCheck();
  useServerStatusNotification();

  const { serverStatusColor } = useServerStatusColor();
  const { serverStatusIcon } = useServerStatusIcon();

  return (
    <StyledBadge color={serverStatusColor} {...props}>
      <IonIcon icon={serverStatusIcon} size="small" />
    </StyledBadge>
  );
};

export default ServerStatus;
