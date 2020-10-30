import { useMemo } from "react";
import { useStoreState } from "../../../store/hooks";
import { ServerStatusType } from "../../../store/models/app/app.model";

export const serverStatusColors = {
  [ServerStatusType.loading]: "medium",
  [ServerStatusType.ready]: "success",
  [ServerStatusType.error]: "danger",
} as const;

/**
 * useServerStatusColor
 *
 * This hook returns the color associated with the server status.
 *
 * @export
 * @return {serverStatusColor}
 */
export function useServerStatusColor() {
  const { serverConnectionStatus } = useStoreState((state) => state.app);

  const serverStatusColor = useMemo(() => {
    switch (serverConnectionStatus) {
      case ServerStatusType.loading:
        return serverStatusColors.loading;
      case ServerStatusType.ready:
        return serverStatusColors.ready;
      case ServerStatusType.error:
        return serverStatusColors.error;
    }
  }, [serverConnectionStatus]);

  return {
    serverStatusColor,
  };
}
