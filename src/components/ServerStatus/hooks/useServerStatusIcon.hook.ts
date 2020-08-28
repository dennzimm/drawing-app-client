import {
  alertCircleOutline,
  reloadCircleOutline,
  wifiOutline,
} from "ionicons/icons";
import { useMemo } from "react";
import { useStoreState } from "../../../store/hooks";
import { NetworkStatusType } from "../../../store/models/app/app.model";

export const serverStatusIcons = {
  [NetworkStatusType.loading]: reloadCircleOutline,
  [NetworkStatusType.ready]: wifiOutline,
  [NetworkStatusType.error]: alertCircleOutline,
} as const;

export function useServerStatusIcon() {
  const serverConnectionStatus = useStoreState(
    (state) => state.app.serverConnectionStatus
  );

  const serverStatusIcon = useMemo(() => {
    switch (serverConnectionStatus) {
      case NetworkStatusType.loading:
        return serverStatusIcons.loading;
      case NetworkStatusType.ready:
        return serverStatusIcons.ready;
      case NetworkStatusType.error:
        return serverStatusIcons.error;
    }
  }, [serverConnectionStatus]);

  return {
    serverStatusIcon,
  };
}
