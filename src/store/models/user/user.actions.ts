import { action, Action } from 'easy-peasy';
import { UserModel, UserState } from './user.model';

export enum UserAction {
  setUserData = 'setUserData',
  setLoading = 'setLoading',
  setDarkMode = 'setDarkMode',
}

export interface UserActions {
  [UserAction.setUserData]: Action<UserModel, Partial<UserState>>;
  [UserAction.setLoading]: Action<UserModel, boolean>;
  [UserAction.setDarkMode]: Action<UserModel, boolean>;
}

const userActions: UserActions = {
  [UserAction.setUserData]: action((state, userData) => {
    Object.assign(state, { ...state, ...userData });
  }),
  [UserAction.setLoading]: action((state, isLoading) => {
    state.loading = isLoading;
  }),
  [UserAction.setDarkMode]: action((state, darkMode) => {
    state.darkMode = darkMode;
  }),
};

export default userActions;
