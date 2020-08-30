import { nanoid } from 'nanoid';
import actions, { UserActions } from './user.actions';
import thunks, { UserThunks } from './user.thunks';

export interface UserState {
  id: string;
  loading: boolean;
  darkMode: boolean;
  hasSeenTutorial: boolean;
}

export type UserModel = UserState & UserActions & UserThunks;

const initialState: UserState = {
  id: nanoid(),
  loading: false,
  darkMode: false,
  hasSeenTutorial: false,
};

const useModel: UserModel = {
  ...initialState,
  ...actions,
  ...thunks,
};

export default useModel;
