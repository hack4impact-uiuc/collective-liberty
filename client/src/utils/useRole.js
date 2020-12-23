import { useState, useEffect } from "react";
import { USER_ROLES } from "./constants";
import { getUserRole } from "./api";

const useRole = () => {
  const [role, setRole] = useState(USER_ROLES.Guest);

  useEffect(() => {
    async function fetchData() {
      setRole(await getUserRole());
    }

    fetchData();
  }, []);

  return role;
};

export default useRole;
