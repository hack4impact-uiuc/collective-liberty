import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../utils/api";

const LogoutPage = () => {
  useEffect(() => {
    logout();
  }, []);

  return <Redirect to="/" />;
};
export default LogoutPage;
