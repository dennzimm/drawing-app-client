import { Thunk, thunk } from 'easy-peasy';
import { getUserData, setHasSeenTutorialData } from '../../../services';
import { UserModel } from './user.model';

export enum UserThunk {
  loadUserData = 'loadUserData',
  setHasSeenTutorial = 'setHasSeenTutorial',
}

export interface UserThunks {
  [UserThunk.loadUserData]: Thunk<UserModel>;
  [UserThunk.setHasSeenTutorial]: Thunk<UserModel, boolean>;
}

const userThunks: UserThunks = {
  [UserThunk.loadUserData]: thunk(async (actions) => {
    actions.setLoading(true);
    const userData = await getUserData();
    actions.setUserData(userData);
    actions.setLoading(false);
  }),
  [UserThunk.setHasSeenTutorial]: thunk(
    async (_, hasSeenTutorial, { getState }) => {
      await setHasSeenTutorialData(hasSeenTutorial);
      getState().hasSeenTutorial = hasSeenTutorial;
    }
  ),
};

export default userThunks;
