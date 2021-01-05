import * as React from "react";
import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import { USER_ROLES } from "./constants";
import { getUserRole } from "./api";

type ProvideAuthParams = {
  children: React.Node,
};

type Auth = {
  authed: ?boolean,
};

function useProvideAuth(): Auth {
  const [authed, setAuthed] = useState(null);
  const [role, setRole] = useState(USER_ROLES.Guest);

  useEffect(() => {
    async function fetchData() {
      getUserRole().then((res) => {
        if (res === USER_ROLES.Admin) {
          setAuthed(true);
          setRole(USER_ROLES.Admin);
        } else {
          setAuthed(false);
        }
      });
    }
    fetchData();
  }, []);

  return {
    authed,
    role,
    setRole
  };
}

const defaultContext: Auth = {
  authed: null,
};

const authContext = createContext(defaultContext);

// Hook for child components to get the auth object
export const useAuth = () => {
  return useContext(authContext);
};

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: ProvideAuthParams) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
