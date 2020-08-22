import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import store from "../../store";

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

export const subscriptionLink = new WebSocketLink(subscriptionClient);
