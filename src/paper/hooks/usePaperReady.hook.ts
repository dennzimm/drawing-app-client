import paper from "paper";
import { useMemo } from "react";
import { useStoreState } from "../../store/hooks";

export function usePaperReady() {
  const readyState = useStoreState((state) => state.drawing.ready);

  const isReady = useMemo(() => {
    const hasScope = !!paper;
    const hasView = !!paper.view;
    const hasReadyState = readyState;

    const isReady = hasScope && hasView && hasReadyState;

    return isReady;
  }, [readyState]);

  return { isReady };
}
