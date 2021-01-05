import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../utils/api";
import { useAuth } from "../utils/useAuth";
import { USER_ROLES } from "../utils/constants";

const LogoutPage = () => {
  const { setRole } = useAuth();

  useEffect(() => {
    logout();
    setRole(USER_ROLES.Guest);
  }, []);

  return <Redirect to="/" />;
};
export default LogoutPage;
