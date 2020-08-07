import { action, Action } from 'easy-peasy';
import { AppModel, NetworkStatusType } from './app.model';

export enum AppAction {
  setMenuEnabled = 'setMenuEnabled',
  setServerConnectionStatus = 'setServerConnectionStatus',
}

export interface AppActions {
  [AppAction.setMenuEnabled]: Action<AppModel, boolean>;
  [AppAction.setServerConnectionStatus]: Action<AppModel, NetworkStatusType>;
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
};

export default appActions;
