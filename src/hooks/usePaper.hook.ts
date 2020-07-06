import { useEffect } from 'react';
import paperProvider from '../providers/paper.provider';

export function usePaper(id: string) {
  useEffect(() => {
    paperProvider.setup(id);

    return () => {
      paperProvider.cleanup();
    };
  }, [id]);
}
