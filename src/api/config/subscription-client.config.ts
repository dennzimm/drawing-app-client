import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import store from "../../store";
import { NetworkStatusType } from "../../store/models/app/app.model";

const GRAPHQL_WS_ENDPOINT = process.env.REACT_APP_GQL_WS_ENDPOINT as string;

export const subscriptionClient = new SubscriptionClient(GRAPHQL_WS_ENDPOINT, {
  reconnect: true,
  lazy: true,
  connectionParams: () => {
    return {
      drawingID: store.getState().drawing.id,
      userID: store.getState().user.userID,
    };
  },
});

const setServerConnectionStatus = store.getActions().app
  .setServerConnectionStatus;

subscriptionClient.onConnected(() => {
  setServerConnectionStatus(NetworkStatusType.ready);
});

subscriptionClient.onReconnected(() => {
  setServerConnectionStatus(NetworkStatusType.ready);
});

subscriptionClient.onDisconnected(() => {
  setServerConnectionStatus(NetworkStatusType.error);
});

subscriptionClient.onError(() => {
  setServerConnectionStatus(NetworkStatusType.error);
});

subscriptionClient.onConnecting(() => {
  setServerConnectionStatus(NetworkStatusType.loading);
});

subscriptionClient.onReconnecting(() => {
  setServerConnectionStatus(NetworkStatusType.loading);
});

export const subscriptionLink = new WebSocketLink(subscriptionClient);
