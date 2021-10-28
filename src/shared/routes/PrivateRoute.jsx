import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import PortalFrame from "../../portal/components/Navigation/PortalFrame";
import { AuthContext } from "../context/auth-context";

const PrivateRoute = (props) => {
  const auth = useContext(AuthContext);

  if (auth.token) {
    return (
      <Route {...props}>
        <PortalFrame>{props.children}</PortalFrame>
      </Route>
    );
  }

  return <Redirect to="/auth" />;
};

export default PrivateRoute;
