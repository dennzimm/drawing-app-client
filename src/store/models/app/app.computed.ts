import { Computed, computed } from "easy-peasy";
import { some } from "lodash-es";
import { AppModel } from "./app.model";

export enum AppComputedItem {
  showAppLoading = "showAppLoading",
}

export interface AppComputedItems {
  [AppComputedItem.showAppLoading]: Computed<AppModel, boolean>;
}

const appComputed: AppComputedItems = {
  [AppComputedItem.showAppLoading]: computed((state) => {
    const someIsPending = some(state.loadingQueue, Boolean);
    return someIsPending;
  }),
};

export default appComputed;
