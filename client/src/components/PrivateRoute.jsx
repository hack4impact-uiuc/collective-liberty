import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useRole from '../utils/useRole';
import { USER_ROLES } from '../utils/constants';

type Props = {
  path: string,
  component: React.ComponentType<any>,
};

const PrivateRoute = (props: Props) => {
  const userRole = useRole();
  const { path, component } = props;
  
  console.log(userRole);
  if (userRole === USER_ROLES.Admin) {
    return <Route path={path} exact component={component} />;
  }
  return <Redirect to="/login" />;
};

export default PrivateRoute;