import actions, { AppActions } from './app.actions';

export interface AppState {
  menuEnabled: boolean;
}

export type AppModel = AppState & AppActions;

const initialState: AppState = {
  menuEnabled: true,
};

const appModel: AppModel = {
  ...initialState,
  ...actions,
};

export default appModel;
