import actions, { AppActions } from "./app.actions";

export enum NetworkStatusType {
  "loading" = "loading",
  "error" = "error",
  "ready" = "ready",
}

export interface AppState {
  menuEnabled: boolean;
  serverConnectionStatus: NetworkStatusType;
  shouldSync: boolean;
}

export type AppModel = AppState & AppActions;

const initialState: AppState = {
  menuEnabled: true,
  serverConnectionStatus: NetworkStatusType.loading,
  shouldSync: false,
};

const appModel: AppModel = {
  ...initialState,
  ...actions,
};

export default appModel;
