import React from "react";
import { NavLink } from "react-router-dom";
import { USER_ROLES } from "../../../utils/constants";
import { useAuth } from "../../../utils/useAuth";
import logo from "../../../imgs/colib-logo.svg";
import "./NavBar.scss";

const NavItem = ({ label, to }) => (
  <li>
    <NavLink activeClassName={"active"} to={to} aria-label={label} exact>
      {label}
    </NavLink>
  </li>
);

const NavBar = () => {
  const { role: userRole } = useAuth();

  return (
    <nav>
      <div>
        <a href="/">
          <img
            align="center"
            width="160"
            height="72"
            src={logo}
            alt="Collective Liberty Logo"
          />
        </a>
      </div>
      <ul>
        <NavItem to="/" label="Explore the Data" />
        <NavItem to="/about" label="About Us" />
        {userRole === USER_ROLES.Admin && (
          <NavItem to="/uploadData" label="Upload Data" />
        )}
        {userRole === USER_ROLES.Admin && (
          <NavItem to="/roleApproval" label="Role Approval" />
        )}
        {userRole && <NavItem to="/logout" label="Logout" />}

        <li>
          <a href="#donate" className={"button"} aria-label="Donate Now">
            Donate Now
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
