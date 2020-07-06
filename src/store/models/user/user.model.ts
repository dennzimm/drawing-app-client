import { nanoid } from 'nanoid';

export interface UserState {
  id: string;
}

export type UserModel = UserState;

const state: UserState = {
  id: nanoid(),
};

const useModel: UserModel = {
  ...state,
};

export default useModel;
