import { Computed, computed } from 'easy-peasy';
import { HistoryModel } from './history.model';

export enum HistoryComputedItem {
  itemsCount = 'itemsCount',
}

export interface HistoryComputedItems {
  [HistoryComputedItem.itemsCount]: Computed<HistoryModel, number>;
}

const historyComputed: HistoryComputedItems = {
  [HistoryComputedItem.itemsCount]: computed((state) => state.items.length),
};

export default historyComputed;
