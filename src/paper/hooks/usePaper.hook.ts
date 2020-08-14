import { useCallback, useEffect, useState } from "react";
import { paperProvider } from "../providers";

interface UsePaperProps {
  id: string;
  injectGlobal?: boolean;
}

export function usePaper({ id, injectGlobal = false }: UsePaperProps) {
  const [isReady, setIsReady] = useState(false);

  const updateFullViewSize = useCallback(() => {
    paperProvider.scope.view.viewSize = new paperProvider.scope.Size(
      window.innerWidth,
      window.innerHeight
    );
  }, []);

  useEffect(() => {
    paperProvider.setup({ id, injectGlobal });
    updateFullViewSize();
    setIsReady(true);

    return () => {
      paperProvider.cleanup();
      setIsReady(false);
    };
  }, [id, injectGlobal, updateFullViewSize]);

  return {
    updateFullViewSize,
    isReady,
  };
}
