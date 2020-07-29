import React from 'react';
import { StoreProvider } from 'easy-peasy';
import store from '..';

const AppStoreProvider: React.FC = ({ children }) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default AppStoreProvider;
