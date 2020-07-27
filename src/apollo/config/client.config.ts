import { ApolloClient, ApolloLink, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
// import { onError } from '@apollo/client/link/error';
// import { RetryLink } from '@apollo/client/link/retry';
import { cache } from './cache.config';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GQL_ENDPOINT as string;
const GRAPHQL_WS_ENDPOINT = process.env.REACT_APP_GQL_WS_ENDPOINT as string;

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const subscriptionLink = new WebSocketLink({
  uri: GRAPHQL_WS_ENDPOINT,
  options: {
    reconnect: true,
    reconnectionAttempts: 2,
    timeout: 1000,
  },
});

// * The split function takes three parameters:
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
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

// // const graphQLErrorHandler = onError(
// //   ({ operation, graphQLErrors, networkError }) => {
// //     if (graphQLErrors) {
// //       console.error(
// //         `[ERROR]: Error trying to execute ${operation.operationName}.`
// //       );
// //       console.error('Error log:', graphQLErrors);
// //     }
// //     if (networkError) {
// //       console.error('Network Error:', networkError);
// //     }
// //   }
// // );

export const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  link: ApolloLink.from([
    // retryLink,
    // graphQLErrorHandler,
    splitLink,
  ]),
});
