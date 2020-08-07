import { action, Action } from "easy-peasy";
import { UserModel, UserState } from "./user.model";

export enum UserAction {
  setLoading = "setLoading",
  setUserData = "setUserData",
  setDarkMode = "setDarkMode",

  // --- Thunks:
  // setIsLoggedIn = 'setIsLoggedIn',
  // setUsername = 'setUsername',
  // setUserID = 'setUserID',
  // setHasSeenTutorial = 'setHasSeenTutorial',
}

export interface UserActions {
  [UserAction.setLoading]: Action<UserModel, boolean>;
  [UserAction.setUserData]: Action<UserModel, Partial<UserState>>;
  [UserAction.setDarkMode]: Action<UserModel, boolean>;
  // --- Thunks:
  // [UserAction.setIsLoggedIn]: Action<UserModel, boolean>;
  // [UserAction.setUsername]: Action<UserModel, string | undefined>;
  // [UserAction.setUserID]: Action<UserModel, string>;
  // [UserAction.setHasSeenTutorial]: Action<UserModel, boolean>;
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
  // --- Thunks:
  // [UserAction.setIsLoggedIn]: action((state, isLoggedIn) => {
  //   state.isLoggedin = isLoggedIn;
  // }),
  // [UserAction.setUsername]: action((state, username) => {
  //   state.username = username;
  // }),
  // [UserAction.setUserID]: action((state, userID) => {
  //   state.userID = userID;
  // }),
  // [UserAction.setHasSeenTutorial]: action((state, hasSeenTutorial) => {
  //   state.hasSeenTutorial = hasSeenTutorial;
  // }),
};

export default userActions;
