import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { USER_ROLES } from "../../utils/constants";
import { useAuth } from "../../utils/useAuth";
import { getUserRole } from "../../utils/api";

import "boxicons";


const SidebarToggle = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      
    </div>
  )
};

export default SidebarToggle;
