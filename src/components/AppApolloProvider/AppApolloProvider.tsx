import { ApolloProvider } from "@apollo/client";
import React from "react";
import { client } from "../../graphql/config";

const AppApolloProvider: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AppApolloProvider;
