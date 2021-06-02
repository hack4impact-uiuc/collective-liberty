import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { USER_ROLES } from "../utils/constants";
import { useAuth } from "../utils/useAuth";
import { getUserRole } from "../utils/api";
import SidebarContainer from "./desktop/SidebarContainer";
import SidebarCollapsed from "./mobile/SidebarCollapsed";
import useWindowDimensions from "../utils/mobile";

import "boxicons";

const SidebarCommon = (props) => {
  const {collapsed, setCollapsed} = props;
  const [windowDimensions, isMobile] = useWindowDimensions();
  // const [collapsed, setCollapsed] = useState(isMobile);

  useEffect(() => {
    if (!isMobile) setCollapsed(false);
  }, [isMobile]);

  
  if (collapsed)
    return (
      <SidebarCollapsed
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        {...props}
      />
    );

  return (
    <SidebarContainer
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      {...props}
    />
  );
};

export default SidebarCommon;
