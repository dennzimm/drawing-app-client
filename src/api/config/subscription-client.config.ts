import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { DEBUG } from "../../constants";
import store from "../../store";

const GRAPHQL_WS_ENDPOINT = process.env.REACT_APP_GQL_WS_ENDPOINT as string;

/**
 * SubscriptionClient
 *
 * An instance of the Subscription Client is
 * created and configured here.
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

/**
 * onReconnected: shouldResync should be set to 'true'.
 */
subscriptionClient.onReconnected(() => {
  DEBUG && console.log("onReconnected");
  store.getActions().app.setShouldResync(true);
});

/**
 * WebSocketLink
 *
 * This link is particularly useful to use with GraphQL Subscriptions,
 * but it will also allow you to send GraphQL queries and mutations over WebSockets.
 *
 * @apollo/client/link/ws takes either a subscription client,
 * or an object with three options, to customize the behavior of the link.
 *
 * Here the subscriptionClient is passed from above.
 *
 */
export const subscriptionLink = new WebSocketLink(subscriptionClient);
