import { action, Action } from "easy-peasy";
import { AppModel, NetworkStatusType } from "./app.model";

export enum AppAction {
  setMenuEnabled = "setMenuEnabled",
  setServerConnectionStatus = "setServerConnectionStatus",
  setShouldSync = "setShouldSync",
}

export interface AppActions {
  [AppAction.setMenuEnabled]: Action<AppModel, boolean>;
  [AppAction.setServerConnectionStatus]: Action<AppModel, NetworkStatusType>;
  [AppAction.setShouldSync]: Action<AppModel, boolean>;
}

const appActions: AppActions = {
  [AppAction.setMenuEnabled]: action((state, menuEnabled) => {
    state.menuEnabled = menuEnabled;
  }),
  [AppAction.setServerConnectionStatus]: action(
    (state, serverConnectionStatus) => {
      state.serverConnectionStatus = serverConnectionStatus;
    }
  ),
  [AppAction.setShouldSync]: action((state, shouldSync) => {
    state.shouldSync = shouldSync;
  }),
};

export default appActions;
