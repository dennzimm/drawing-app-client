import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo } from "react";
import { IsOnline } from "../../../api/@types/generated/gql-operations.types";
import { IS_ONLINE } from "../../../api/graphql/app.graphql";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import { ServerStatusType } from "../../../store/models/app/app.model";

const serverStatusCheckOptions = {
  pollInterval: 5000,
} as const;

/**
 * useServerStatusCheck
 *
 * This hook provides functions to query the status of the server.
 * With the help of a lazy query the status is requested in a poll interval.
 *
 * @export
 * @return {checkServerStatus, stopServerStatusCheck}
 */
export function useServerStatusCheck() {
  const { serverConnectionStatus } = useStoreState((state) => state.app);

  const { setServerConnectionStatus, setShouldResync } = useStoreActions(
    (actions) => actions.app
  );

  const [
    checkServerStatus,
    { error, loading, stopPolling: stopServerStatusCheck, called },
  ] = useLazyQuery<IsOnline>(IS_ONLINE.mutation, {
    pollInterval: serverStatusCheckOptions.pollInterval,
    notifyOnNetworkStatusChange: true,
  });

  const waitForQueryResponse = useMemo(() => !called || loading, [
    called,
    loading,
  ]);

  const setServerError = useCallback(() => {
    if (waitForQueryResponse) {
      return;
    }

    if (serverConnectionStatus !== ServerStatusType.error) {
      setServerConnectionStatus(ServerStatusType.error);
    }
  }, [serverConnectionStatus, setServerConnectionStatus, waitForQueryResponse]);

  const setServerReady = useCallback(() => {
    if (waitForQueryResponse) {
      return;
    }

    if (serverConnectionStatus === ServerStatusType.error) {
      setShouldResync(true);
    }

    if (serverConnectionStatus !== ServerStatusType.ready) {
      setServerConnectionStatus(ServerStatusType.ready);
    }
  }, [
    serverConnectionStatus,
    setServerConnectionStatus,
    setShouldResync,
    waitForQueryResponse,
  ]);

  useEffect(() => {
    if (error) {
      return setServerError();
    }

    return setServerReady();
  }, [error, setServerError, setServerReady]);

  return {
    checkServerStatus,
    stopServerStatusCheck,
  };
}
