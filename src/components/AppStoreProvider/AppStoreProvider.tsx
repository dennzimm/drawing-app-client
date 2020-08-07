import { StoreProvider } from "easy-peasy";
import React from "react";
import store from "../../store";

const AppStoreProvider: React.FC = ({ children }) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default AppStoreProvider;
