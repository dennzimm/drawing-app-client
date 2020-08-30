import React from "react";
import { Redirect } from "react-router";
import { useStoreState } from "../../store/hooks";

const DrawingsOrTutorial: React.FC = () => {
  const { hasSeenTutorial } = useStoreState((state) => state.user);

  return hasSeenTutorial ? (
    <Redirect to="/drawings" />
  ) : (
    <Redirect to="/tutorial" />
  );
};

export default DrawingsOrTutorial;
