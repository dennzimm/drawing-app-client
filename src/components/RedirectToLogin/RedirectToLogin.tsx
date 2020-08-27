import { IonRouterContext } from "@ionic/react";
import React, { useContext, useEffect } from "react";

interface RedirectToLoginProps {
  setIsLoggedIn: Function;
  setUsername: Function;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({
  setIsLoggedIn,
  setUsername,
}) => {
  const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    setIsLoggedIn(false);
    setUsername(undefined);
    ionRouterContext.push("/tabs/schedule");
  }, [setIsLoggedIn, setUsername, ionRouterContext]);
  return null;
};

export default RedirectToLogin;
