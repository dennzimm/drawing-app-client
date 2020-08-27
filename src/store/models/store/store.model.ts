import drawingModel, { DrawingModel } from "../drawing/drawing.model";
import appModel, { AppModel } from "../app/app.model";
import userModel, { UserModel } from "../user/user.model";

export interface StoreState {}

export interface StoreModel extends StoreState {
  app: AppModel;
  user: UserModel;
  drawing: DrawingModel;
}

const state: StoreState = {};

const storeModel: StoreModel = {
  ...state,
  app: appModel,
  user: userModel,
  drawing: drawingModel,
};

export default storeModel;
