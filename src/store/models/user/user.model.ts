import { nanoid } from 'nanoid';
import actions, { UserActions } from './user.actions';
import thunks, { UserThunks } from './user.thunks';

export interface UserState {
  isLoggedin: boolean;
  // darkMode: boolean;
  hasSeenTutorial: boolean;
  loading: boolean;
  username?: string;
  userID: string;
}

export type UserModel = UserState & UserActions & UserThunks;

const initialState: UserState = {
  hasSeenTutorial: false,
  // darkMode: false,
  isLoggedin: false,
  loading: false,
  userID: nanoid(),
};

const useModel: UserModel = {
  ...initialState,
  ...actions,
  ...thunks,
};

export default useModel;
