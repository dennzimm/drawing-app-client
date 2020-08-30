import {
  alertCircleOutline,
  reloadCircleOutline,
  wifiOutline,
} from "ionicons/icons";
import { useMemo } from "react";
import { useStoreState } from "../../../store/hooks";
import { ServerStatusType } from "../../../store/models/app/app.model";

export const serverStatusIcons = {
  [ServerStatusType.loading]: reloadCircleOutline,
  [ServerStatusType.ready]: wifiOutline,
  [ServerStatusType.error]: alertCircleOutline,
} as const;

export function useServerStatusIcon() {
  const serverConnectionStatus = useStoreState(
    (state) => state.app.serverConnectionStatus
  );

  const serverStatusIcon = useMemo(() => {
    switch (serverConnectionStatus) {
      case ServerStatusType.loading:
        return serverStatusIcons.loading;
      case ServerStatusType.ready:
        return serverStatusIcons.ready;
      case ServerStatusType.error:
        return serverStatusIcons.error;
    }
  }, [serverConnectionStatus]);

  return {
    serverStatusIcon,
  };
}
