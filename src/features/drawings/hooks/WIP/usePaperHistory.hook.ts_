import { decompress } from 'lz-string';
import { useEffect, useMemo } from 'react';
import paperProvider from '../providers/paper.provider';
import { useStoreActions, useStoreState } from '../store/hooks';

interface UsePaperHistoryProps {
  limit: number;
}

const defaultProps: UsePaperHistoryProps = {
  limit: 10,
};

export function usePaperHistory({
  limit,
}: UsePaperHistoryProps = defaultProps) {
  const { setLimit, incCurrent, decCurrent } = useStoreActions(
    (actions) => actions.history
  );
  const { current, items, itemsCount } = useStoreState(
    (state) => state.history
  );

  const canUndo = useMemo(() => current > -1, [current]);
  const canRedo = useMemo(() => itemsCount - 1 > current, [
    current,
    itemsCount,
  ]);

  useEffect(() => {
    setLimit(limit);
  }, [limit, setLimit]);

  function undo() {
    if (canUndo) {
      // const item = paperProvider.getChildById(items[current].id);
      const item = paperProvider.getLayerById(items[current].id);
      item && item.remove();
      decCurrent();
    }
  }

  function redo() {
    if (canRedo) {
      const decompressedData = decompress(items[current + 1].data);
      decompressedData &&
        // paperProvider.activeLayer.importJSON(decompressedData);
        paperProvider.project.importJSON(decompressedData);
      incCurrent();
    }
  }

  return {
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
