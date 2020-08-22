import {
  ApolloClient,
  ApolloLink,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
// import { RetryLink } from '@apollo/client/link/retry';
import { cache } from "./apollo-cache.config";
import { subscriptionLink } from "./subscription-client.config";

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

// // const retryLink = new RetryLink({
// //   delay: {
// //     initial: 1000,
// //     max: Infinity,
// //     jitter: false,
// //   },
// //   attempts: (count, operation, error) => {
// //     console.log(count);
// //     const serverUnavailable = count >= 3;
// //     return serverUnavailable;
// //   },
// // });

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
  link: ApolloLink.from([
    // retryLink,
    graphQLErrorHandler,
    splitLink,
  ]),
});
