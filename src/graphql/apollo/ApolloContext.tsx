import { ApolloProvider } from '@apollo/client';
import React from 'react';
import client from './apollo.client';

export const ApolloContext: React.FC = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
