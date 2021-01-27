import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { logout, getUserRole } from "../utils/api";
import { useAuth } from "../utils/useAuth";
import { USER_ROLES } from "../utils/constants";

const LogoutPage = () => {
  const { setAuthed, setRole } = useAuth();

  useEffect(() => {
    async function doActions() {
      await logout();
      setRole(await getUserRole());
      setAuthed(false);
    }

    doActions();
  }, []);

  return <Redirect to="/" />;
};
export default LogoutPage;
