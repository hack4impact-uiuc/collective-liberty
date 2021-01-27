import React from "react";
import { Route, Redirect } from "react-router-dom";
import { USER_ROLES } from "../utils/constants";
import { useAuth } from "../utils/useAuth";

type Props = {
  path: string,
  component: React.ComponentType<any>,
};

const PrivateRoute = (props: Props) => {
  const { authed, role } = useAuth();
  const { path, component } = props;

  if (authed === true && role === USER_ROLES.Admin) {
    return <Route path={path} exact component={component} />;
  }

  if (authed === null || role === null) {
    return null;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
