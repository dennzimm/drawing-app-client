import { NetworkStatusType } from "../store/models/app/app.model";
import store from "../store";

export function setServerConnectionStatus(serverStatus: NetworkStatusType) {
  const setServerConnectionStatusAction = store.getActions().app
    .setServerConnectionStatus;

  setServerConnectionStatusAction(serverStatus);
}
