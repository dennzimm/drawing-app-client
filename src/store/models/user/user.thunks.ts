import { Thunk, thunk } from 'easy-peasy';
import {
  getUserData,
  setHasSeenTutorialData,
  setIsLoggedInData,
  setUsernameData,
} from '../../../services/storage.service';
import { UserModel } from './user.model';

export enum UserThunk {
  loadUserData = 'loadUserData',
  logoutUser = 'logoutUser',
  setIsLoggedIn = 'setIsLoggedIn',
  setUsername = 'setUsername',
  setHasSeenTutorial = 'setHasSeenTutorial',
}

export interface UserThunks {
  [UserThunk.loadUserData]: Thunk<UserModel>;
  [UserThunk.logoutUser]: Thunk<UserModel>;
  [UserThunk.setIsLoggedIn]: Thunk<UserModel, boolean>;
  [UserThunk.setUsername]: Thunk<UserModel, string | undefined>;
  [UserThunk.setHasSeenTutorial]: Thunk<UserModel, boolean>;
}

const userThunks: UserThunks = {
  [UserThunk.loadUserData]: thunk(async (actions) => {
    actions.setLoading(true);
    const userData = await getUserData();
    actions.setUserData(userData);
    actions.setLoading(false);
  }),
  [UserThunk.logoutUser]: thunk(async (_, __, { getState }) => {
    await setIsLoggedInData(false);
    getState().username = undefined;
  }),
  [UserThunk.setIsLoggedIn]: thunk(async (_, loggedIn, { getState }) => {
    await setIsLoggedInData(loggedIn);
    getState().isLoggedin = loggedIn;
  }),
  [UserThunk.setUsername]: thunk(async (_, username, { getState }) => {
    await setUsernameData(username);
    getState().username = username;
  }),
  [UserThunk.setHasSeenTutorial]: thunk(
    async (_, hasSeenTutorial, { getState }) => {
      await setHasSeenTutorialData(hasSeenTutorial);
      getState().hasSeenTutorial = hasSeenTutorial;
    }
  ),
};

export default userThunks;
