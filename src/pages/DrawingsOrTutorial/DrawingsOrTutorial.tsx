import React from "react";
import { Redirect } from "react-router";
import { useStoreState } from "../../store/hooks";

/**
 * DrawingsOrTutorial
 *
 * The DrawingsOrTutorial page / view of this application.
 * This page is used to redirect the user to the /drawings route
 * or the /tutorial route depending on whether the user has
 * already seen the tutorial
 *
 * @return {React.FC}
 */
const DrawingsOrTutorial: React.FC = () => {
  const { hasSeenTutorial } = useStoreState((state) => state.user);

  return hasSeenTutorial ? (
    <Redirect to="/drawings" />
  ) : (
    <Redirect to="/tutorial" />
  );
};

export default DrawingsOrTutorial;
