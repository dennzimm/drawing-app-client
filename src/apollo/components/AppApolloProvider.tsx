import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { client } from '../config/client.config';

const AppApolloProvider: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AppApolloProvider;
