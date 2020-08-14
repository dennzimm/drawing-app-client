import { useMemo } from "react";
import { useStoreState } from "../../store/hooks";
import { paperProvider } from "../providers";

export function usePaperReady() {
  const readyState = useStoreState((state) => state.drawing.ready);

  const isReady = useMemo(() => {
    const hasScope = !!paperProvider.scope;
    const hasView = !!paperProvider.view;
    const hasReadyState = readyState;

    const isReady = hasScope && hasView && hasReadyState;

    return isReady;
  }, [readyState]);

  return { isReady };
}
