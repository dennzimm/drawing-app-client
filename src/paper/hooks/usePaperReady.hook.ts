import paper from "paper";
import { useEffect, useState } from "react";
import { useStoreState } from "../../store/hooks";

export function usePaperReady() {
  const readyState = useStoreState((state) => state.drawing.ready);

  const [isReady, setIsReady] = useState(false);

  // TODO: Broken. Fix this
  useEffect(() => {
    const hasScope = !!paper;
    const hasProject = !!paper.project;
    const hasReadyState = readyState;
    const isReadyCondition = hasScope && hasProject && hasReadyState;

    if (isReadyCondition !== isReady) {
      setIsReady(isReadyCondition);
    }

    console.log("usePaperReady -> isReady", isReady);
  }, [isReady, readyState]);

  return { isReady };
}
