import { action, Action } from "easy-peasy";
import { UserModel, UserState } from "./user.model";

export enum UserAction {
  setLoading = "setLoading",
  setUserData = "setUserData",
  setDarkMode = "setDarkMode",
}

export interface UserActions {
  [UserAction.setLoading]: Action<UserModel, boolean>;
  [UserAction.setUserData]: Action<UserModel, Partial<UserState>>;
  [UserAction.setDarkMode]: Action<UserModel, boolean>;
}

const userActions: UserActions = {
  [UserAction.setLoading]: action((state, isLoading) => {
    state.loading = isLoading;
  }),
  [UserAction.setDarkMode]: action((state, darkMode) => {
    state.darkMode = darkMode;
  }),
  [UserAction.setUserData]: action((state, userData) => {
    state = {
      ...state,
      ...userData,
    };
  }),
};

export default userActions;
