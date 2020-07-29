import actions, { HistoryActions } from './history.actions';
import computed, { HistoryComputedItems } from './history.computed';
import thunks, { HistoryThunks } from './history.thunks';

export interface HistoryItemData {
  id: string;
  data: string;
}

export interface HistoryState {
  items: HistoryItemData[];
  current: number;
  limit: number;
}

export type HistoryModel = HistoryState &
  HistoryActions &
  HistoryComputedItems &
  HistoryThunks;

const state: HistoryState = {
  items: [],
  current: -1,
  limit: 10,
};

const historyModel: HistoryModel = {
  ...state,
  ...computed,
  ...actions,
  ...thunks,
};

export default historyModel;
