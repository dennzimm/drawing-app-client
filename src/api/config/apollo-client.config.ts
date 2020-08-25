import {
  ApolloClient,
  ApolloLink,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { RetryLink } from "@apollo/client/link/retry";
import { cache } from "./apollo-cache.config";
import { subscriptionLink } from "./subscription-client.config";
import { CREATE_ITEM, DELETE_ITEM } from "../graphql/item.graphql";

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GQL_ENDPOINT as string;

// const httpLink = new HttpLink({
//   uri: GRAPHQL_ENDPOINT,
// });

const httpLink = new BatchHttpLink({
  uri: GRAPHQL_ENDPOINT,
  batchInterval: 50,
});

// * The split function takes three parameters:
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
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

const retryLink = new RetryLink({
  delay: {
    initial: 50,
    max: 500,
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

      console.log("shouldRetry", shouldRetry, operation.operationName);

      return shouldRetry;
    },
  },
});

const graphQLErrorHandler = onError(
  ({ operation, graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.error(
        `[ERROR]: Error trying to execute ${operation.operationName}.`
      );
      console.error("Error log:", graphQLErrors);
    }

    if (networkError) {
      console.error("Network Error:", networkError);
    }
  }
);

export const client = new ApolloClient<NormalizedCacheObject>({
  cache,
  connectToDevTools: true,
  link: ApolloLink.from([retryLink, graphQLErrorHandler, splitLink]),
});
