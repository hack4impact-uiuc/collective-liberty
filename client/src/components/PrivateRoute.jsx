import React from 'react';
import { Route, Redirect } from 'react-router-dom';


import { useAuth } from '../utils/use-auth';

type Props = {
  path: string,
  component: React.ComponentType<any>,
};

const PrivateRoute = (props: Props) => {
  const { authed } = useAuth();
  const { path, component } = props;

  if (authed === true) {
    return <Route path={path} exact component={component} />;
  }

  if (authed === null) {
    return null;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;