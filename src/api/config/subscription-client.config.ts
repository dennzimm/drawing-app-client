import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { DEBUG } from "../../constants";
import store from "../../store";

const GRAPHQL_WS_ENDPOINT = process.env.REACT_APP_GQL_WS_ENDPOINT as string;

/**
 * SubscriptionClient
 *
 * Send GraphQL operations over a WebSocket
 */
export const subscriptionClient = new SubscriptionClient(GRAPHQL_WS_ENDPOINT, {
  reconnect: true,
  lazy: true,
  connectionParams: () => {
    return {
      drawingID: store.getState().drawing.id,
      userID: store.getState().user.id,
    };
  },
});

subscriptionClient.onReconnected(() => {
  DEBUG && console.log("onReconnected");
  store.getActions().app.setShouldResync(true);
});

export const subscriptionLink = new WebSocketLink(subscriptionClient);
