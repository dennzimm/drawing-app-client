import actions, { AppActions } from "./app.actions";
import computed, { AppComputedItems } from "./app.computed";

export enum ServerStatusType {
  "loading" = "loading",
  "error" = "error",
  "ready" = "ready",
}

export interface AppState {
  menuEnabled: boolean;
  shouldResync: boolean;
  serverConnectionStatus: ServerStatusType;
  loadingQueue: Record<string, boolean>;
}

export type AppModel = AppState & AppActions & AppComputedItems;

const initialState: AppState = {
  menuEnabled: true,
  shouldResync: false,
  serverConnectionStatus: ServerStatusType.loading,
  loadingQueue: {},
};

const appModel: AppModel = {
  ...initialState,
  ...actions,
  ...computed,
};

export default appModel;
