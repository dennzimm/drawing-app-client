import { Thunk, thunk } from 'easy-peasy';
import { compress } from 'lz-string';
import { HistoryItemData, HistoryModel } from './history.model';

export enum HistoryThunk {
  addToHistory = 'addToHistory',
  clearHistory = 'clearHistory',
}

export interface HistoryThunks {
  [HistoryThunk.addToHistory]: Thunk<HistoryModel, HistoryItemData>;
  [HistoryThunk.clearHistory]: Thunk<HistoryModel>;
}

const historyThunks: HistoryThunks = {
  [HistoryThunk.addToHistory]: thunk((actions, payload, { getState }) => {
    const { itemsCount, limit, current } = getState();

    if (itemsCount >= limit) {
      actions.removeFirstItem();
    }

    if (current !== itemsCount - 1) {
      actions.removeFromIndex(current + 1);
    }

    const compressedData = compress(payload.data);
    actions.addItem({ ...payload, data: compressedData });
    actions.setCurrentToLast();
  }),
  [HistoryThunk.clearHistory]: thunk((actions, _, { getState }) => {
    const { itemsCount } = getState();

    if (itemsCount > 0) {
      actions.removeFromIndex(0);
      actions.setCurrent(-1);
    }
  }),
};

export default historyThunks;
