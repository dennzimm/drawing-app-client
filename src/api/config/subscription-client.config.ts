import { SubscriptionClient } from "subscriptions-transport-ws";
import { setServerConnectionStatus } from "../../helper";
import { NetworkStatusType } from "../../store/models/app/app.model";
import { WebSocketLink } from "@apollo/client/link/ws";

const GRAPHQL_WS_ENDPOINT = process.env.REACT_APP_GQL_WS_ENDPOINT as string;

export const subscriptionClient = new SubscriptionClient(GRAPHQL_WS_ENDPOINT, {
  reconnect: true,
  lazy: true,
  timeout: 3000,
});

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
