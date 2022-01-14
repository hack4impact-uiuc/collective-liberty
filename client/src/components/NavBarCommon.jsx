import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { USER_ROLES } from "../utils/constants";
import { useAuth } from "../utils/useAuth";
import { getUserRole } from "../utils/api";
import useWindowDimensions from "../utils/mobile";
import NavBar from "./desktop/NavBar";
import NavBarMobile from "./mobile/NavBarMobile";

const NavBarCommon = (props) => {
  const [, isMobile] = useWindowDimensions();

  if (isMobile) return <NavBarMobile {...props} />;
  return <NavBar {...props} />;
};

export default NavBarCommon;
