import { useMemo } from "react";
import { useStoreState } from "../../../store/hooks";
import { NetworkStatusType } from "../../../store/models/app/app.model";

export const serverStatusColors = {
  [NetworkStatusType.loading]: "medium",
  [NetworkStatusType.ready]: "success",
  [NetworkStatusType.error]: "danger",
} as const;

export function useServerStatusColor() {
  const serverConnectionStatus = useStoreState(
    (state) => state.app.serverConnectionStatus
  );

  const serverStatusColor = useMemo(() => {
    switch (serverConnectionStatus) {
      case NetworkStatusType.loading:
        return serverStatusColors.loading;
      case NetworkStatusType.ready:
        return serverStatusColors.ready;
      case NetworkStatusType.error:
        return serverStatusColors.error;
    }
  }, [serverConnectionStatus]);

  return {
    serverStatusColor,
  };
}
