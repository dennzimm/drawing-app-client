import { Action, action } from 'easy-peasy';
import { HistoryItemData, HistoryModel } from './history.model';

export enum HistoryAction {
  addItem = 'addItem',
  removeFirstItem = 'removeFirstItem',
  removeItem = 'removeItem',
  removeFromIndex = 'removeFromIndex',
  setCurrent = 'setCurrent',
  setCurrentToLast = 'setCurrentToLast',
  setCurrentToFirst = 'setCurrentToFirst',
  incCurrent = 'incCurrent',
  decCurrent = 'decCurrent',
  setLimit = 'setLimit',
}

export interface HistoryActions {
  [HistoryAction.addItem]: Action<HistoryModel, HistoryItemData>;
  [HistoryAction.removeFirstItem]: Action<HistoryModel>;
  [HistoryAction.removeItem]: Action<HistoryModel, number>;
  [HistoryAction.removeFromIndex]: Action<HistoryModel, number>;
  [HistoryAction.setCurrent]: Action<HistoryModel, number>;
  [HistoryAction.setCurrentToLast]: Action<HistoryModel>;
  [HistoryAction.setCurrentToFirst]: Action<HistoryModel>;
  [HistoryAction.incCurrent]: Action<HistoryModel>;
  [HistoryAction.decCurrent]: Action<HistoryModel>;
  [HistoryAction.setLimit]: Action<HistoryModel, number>;
}

const historyActions: HistoryActions = {
  [HistoryAction.addItem]: action((state, item) => {
    state.items.push(item);
  }),
  [HistoryAction.removeFirstItem]: action((state) => {
    state.items.shift();
  }),
  [HistoryAction.removeItem]: action((state, index) => {
    if (state.itemsCount > 0 && index >= 0 && index < state.itemsCount) {
      state.items.splice(index, 1);
    }
  }),
  [HistoryAction.removeFromIndex]: action((state, index) => {
    if (state.itemsCount > 0 && index >= 0 && index < state.itemsCount) {
      state.items.splice(index);
    }
  }),
  [HistoryAction.setCurrent]: action((state, current) => {
    state.current = current;
  }),
  [HistoryAction.setCurrentToLast]: action((state) => {
    state.current = state.items.length - 1;
  }),
  [HistoryAction.setCurrentToFirst]: action((state) => {
    state.current = -1;
  }),
  [HistoryAction.incCurrent]: action((state) => {
    state.current = state.current + 1;
  }),
  [HistoryAction.decCurrent]: action((state) => {
    state.current = state.current - 1;
  }),
  [HistoryAction.setLimit]: action((state, limit) => {
    state.limit = limit;
  }),
};

export default historyActions;
