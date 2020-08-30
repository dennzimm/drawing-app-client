import { action, Action } from "easy-peasy";
import { set } from "lodash-es";
import { AppModel, AppState } from "./app.model";

export enum AppAction {
  setMenuEnabled = "setMenuEnabled",
  setShouldResync = "setShouldResync",
  setServerConnectionStatus = "setServerConnectionStatus",
  addToLoadingQueue = "addToLoadingQueue",
  removeFromLoadingQueue = "removeFromLoadingQueue",
}

export interface AppActions {
  [AppAction.setMenuEnabled]: Action<AppModel, AppState["menuEnabled"]>;
  [AppAction.setShouldResync]: Action<AppModel, AppState["shouldResync"]>;
  [AppAction.setServerConnectionStatus]: Action<
    AppModel,
    AppState["serverConnectionStatus"]
  >;
  [AppAction.addToLoadingQueue]: Action<AppModel, string>;
  [AppAction.removeFromLoadingQueue]: Action<AppModel, string>;
}

const appActions: AppActions = {
  [AppAction.setMenuEnabled]: action((state, menuEnabled) => {
    state.menuEnabled = menuEnabled;
  }),
  [AppAction.setShouldResync]: action((state, shouldResync) => {
    state.shouldResync = shouldResync;
  }),
  [AppAction.setServerConnectionStatus]: action(
    (state, serverConnectionStatus) => {
      state.serverConnectionStatus = serverConnectionStatus;
    }
  ),
  [AppAction.addToLoadingQueue]: action((state, id) => {
    set(state, "loadingQueue", { ...state.loadingQueue, [id]: true });
  }),
  [AppAction.removeFromLoadingQueue]: action((state, key) => {
    set(state, `loadingQueue.${key}`, false);
  }),
};

export default appActions;
