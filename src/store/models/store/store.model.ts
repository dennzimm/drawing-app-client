import historyModel, { HistoryModel } from '../history/history.model';
import toolModel, { ToolModel } from '../tool/tool.model';
import userModel, { UserModel } from '../user/user.model';

export interface StoreState {}

export interface StoreModel extends StoreState {
  tool: ToolModel;
  user: UserModel;
  history: HistoryModel;
}

const state: StoreState = {};

const storeModel: StoreModel = {
  ...state,
  tool: toolModel,
  user: userModel,
  history: historyModel,
};

export default storeModel;
