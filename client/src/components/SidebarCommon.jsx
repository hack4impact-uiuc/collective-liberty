import React from "react";
import SidebarContainer from "./desktop/SidebarContainer";
import SidebarCollapsed from "./mobile/SidebarCollapsed";
import useWindowDimensions from "../utils/mobile";

import "boxicons";

const SidebarCommon = (props) => {
  const { collapsed, setCollapsed } = props;
  const [, isMobile] = useWindowDimensions();

  if (!isMobile) {
    setCollapsed(false);
  }

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
