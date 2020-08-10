import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { IsServerOnline } from "../../../api/@types/generated/gql-operations.types";
import { IS_SERVER_ONLINE } from "../../../api/graphql/queries";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { NetworkStatusType } from "../../../store/models/app/app.model";

const serverStatusCheckOptions = {
  pollInterval: 3000,
} as const;

export function useServerStatusCheck() {
  const serverConnectionStatus = useStoreState(
    (state) => state.app.serverConnectionStatus
  );

  const setServerConnectionStatus = useStoreActions(
    (actions) => actions.app.setServerConnectionStatus
  );

  const [hasServerConnection, setHasServerConnection] = useState(false);

  const setServerError = useCallback(() => {
    setHasServerConnection(false);

    if (serverConnectionStatus !== NetworkStatusType.error) {
      setServerConnectionStatus(NetworkStatusType.error);
    }
  }, [serverConnectionStatus, setServerConnectionStatus]);

  const setServerReady = useCallback(() => {
    setHasServerConnection(true);

    if (serverConnectionStatus !== NetworkStatusType.ready) {
      setServerConnectionStatus(NetworkStatusType.ready);
    }
  }, [serverConnectionStatus, setServerConnectionStatus]);

  const { error, loading } = useQuery<IsServerOnline>(IS_SERVER_ONLINE, {
    pollInterval: serverStatusCheckOptions.pollInterval,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      return setServerError();
    }

    setServerReady();
  }, [error, loading, setServerError, setServerReady]);

  return {
    hasServerConnection,
  };
}
