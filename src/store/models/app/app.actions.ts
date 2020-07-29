import { action, Action } from 'easy-peasy';
import { AppModel } from './app.model';

export enum AppAction {
  setMenuEnabled = 'setMenuEnabled',
}

export interface AppActions {
  [AppAction.setMenuEnabled]: Action<AppModel, boolean>;
}

const appActions: AppActions = {
  [AppAction.setMenuEnabled]: action((state, menuEnabled) => {
    state.menuEnabled = menuEnabled;
  }),
};

export default appActions;
