import { nanoid } from 'nanoid';

export interface UserState {
  id: string;
  layers: string[];
}

export type UserModel = UserState;

const state: UserState = {
  id: nanoid(),
  layers: [],
};

const useModel: UserModel = {
  ...state,
};

export default useModel;
