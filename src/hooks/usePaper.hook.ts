import { useEffect, useState } from 'react';
import paperProvider from '../providers/paper.provider';

export function usePaper(id: string) {
  const [isReady, setIsReady] = useState(false);

  function updateFullViewSize() {
    paperProvider.scope.view.viewSize = new paperProvider.scope.Size(
      window.innerWidth,
      window.innerHeight
    );
  }

  useEffect(() => {
    paperProvider.setup(id);
    setIsReady(true);

    return () => {
      paperProvider.cleanup();
      setIsReady(false);
    };
  }, [id]);

  return {
    updateFullViewSize,
    isReady,
  };
}
