import {
  ApolloClient,
  ApolloLink,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { getMainDefinition } from "@apollo/client/utilities";
import { DEBUG } from "../../constants";
import { CREATE_ITEM, DELETE_ITEM } from "../graphql/item.graphql";
import { cache } from "./apollo-cache.config";
import { subscriptionLink } from "./subscription-client.config";

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GQL_ENDPOINT as string;

/**
 * BatchHttpLink
 *
 * @apollo/client/link/batch-http is a terminating link that combines
 * multiple GraphQL operations into a single HTTP request.
 * This link batches individual operations together into an array
 * that is sent to a single GraphQL endpoint.
 *
 * (https://www.apollographql.com/docs/react/api/link/apollo-link-batch-http/)
 */
const httpLink = new BatchHttpLink({
  uri: GRAPHQL_ENDPOINT,
  batchMax: 100,
});

/**
 * split
 *
 * Apollo Client should use your WebSocketLink for subscriptions,
 * but it shouldn't use it for queries or mutations.
 * To support this, the @apollo/client library provides a split function
 * that lets you use one of two different Links, according to the
 * result of a boolean check.
 *
 * The split function takes three parameters:
 * A function that's called for each operation to execute
 * The Link to use for an operation if the function returns a "truthy" value
 * The Link to use for an operation if the function returns a "falsy" value
 *
 * (https://www.apollographql.com/docs/react/data/subscriptions/)
 */
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  subscriptionLink,
  httpLink
);

/**
 * Retry Link
 *
 * Attempt an operation multiple times if it fails due to network or server errors.
 * @apollo/client/link/retry can be used to retry an operation a certain amount of times.
 *
 * https://www.apollographql.com/docs/react/api/link/apollo-link-retry/
 */
const retryLink = new RetryLink({
  delay: {
    initial: 50,
    max: 1500,
    jitter: true,
  },
  attempts: {
    max: Infinity,
    retryIf: (error, operation) => {
      const whitelistedOperations = [CREATE_ITEM.name, DELETE_ITEM.name];
      const isInWhitelist = whitelistedOperations.some(
        (operationName) => operationName === operation.operationName
      );
      const shouldRetry = !!error && isInWhitelist;

      return shouldRetry;
    },
  },
});

/**
 * Error Link
 *
 * Handle and inspect errors in your GraphQL network stack.
 *
 * https://www.apollographql.com/docs/react/api/link/apollo-link-error/
 */
const graphQLErrorHandler = onError(
  ({ operation, graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      if (DEBUG) {
        console.error("Error log:", graphQLErrors);
        console.error(
          `[ERROR]: Error trying to execute ${operation.operationName}.`
        );
      }
    }

    if (networkError) {
      if (DEBUG) {
        console.error("Network Error:", networkError);
      }
    }
  }
);

/**
 * ApolloClient
 *
 * The ApolloClient class encapsulates Apollo's core client-side API.
 * It backs all available view-layer integrations.
 *
 * The constructor for ApolloClient accepts an ApolloClientOptions object
 * that supports the required and optional fields listed below.
 * These fields make it easy to customize how Apollo works based
 * on your application's needs.
 *
 * https://www.apollographql.com/docs/react/api/core/ApolloClient/
 */
export const client = new ApolloClient<NormalizedCacheObject>({
  cache,
  connectToDevTools: true,
  link: ApolloLink.from([retryLink, graphQLErrorHandler, splitLink]),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});
