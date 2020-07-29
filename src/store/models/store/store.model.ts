import appModel, { AppModel } from '../app/app.model';
import drawingModel, { DrawingModel } from '../drawing/drawing.model';
import historyModel, { HistoryModel } from '../history/history.model';
import userModel, { UserModel } from '../user/user.model';

export interface StoreState {}

export interface StoreModel extends StoreState {
  app: AppModel;
  user: UserModel;
  drawing: DrawingModel;
  history: HistoryModel;
}

const state: StoreState = {};

const storeModel: StoreModel = {
  ...state,
  app: appModel,
  user: userModel,
  drawing: drawingModel,
  history: historyModel,
};

export default storeModel;
