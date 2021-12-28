import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { USER_ROLES } from "../../utils/constants";
import { useAuth } from "../../utils/useAuth";
import { getUserRole } from "../../utils/api";
import colibLogo from "../../imgs/colib-logo.svg";

import "boxicons";
import "../../styles/NavBarMobile.css";

// styles
const linkClasses =
  "navbar-link block lg:inline-block lg:mt-0 p-8 text-md font-semibold txt-dark-green px-16 border-b-4 border-white hover-border-dark-green";
const activeLinkClasses =
  "navbar-link text-white bg-dark-green border-b-4 border-dark-green";
const navButtonClasses =
  "navbar-link block lg:inline-block lg:mt-0 p-6 pr-12 pl-12 mr-4 ml-4 text-white text-md font-semibold bg-orange rounded";

const NavBarMobile = () => {
  const { role: userRole, setRole } = useAuth();
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav class="navbar-mobile flex items-center justify-between flex-wrap shadow-md">
      <div class="flex w-full justify-between items-center flex-shrink-0 text-white mx-5">
        <a href="/">
          {" "}
          <img
            align="center"
            width="96"
            height="43"
            src={colibLogo}
            alt="Collective Liberty Logo"
            className="navbar-mobile-logo"
          />
        </a>
        {/* <box-icon name="menu" size="36px" className="navbar-menu-icon"></box-icon> */}
        <button
          className="navbar-menu-icon"
          onClick={() => setShowLinks(!showLinks)}
        >
          <div className="navbar-menu-icon-bar w-full" />
          <div className="navbar-menu-icon-bar w-full" />
          <div className="navbar-menu-icon-bar w-full" />
        </button>
      </div>
      {showLinks && (
        <ul class="navbar-links w-full block justify-end lg:flex lg:items-center lg:w-auto leading-none text-md lg:flex-grow">
          <li>
            <NavLink
              to="/"
              className={linkClasses}
              activeClassName={activeLinkClasses}
              aria-label="Explore the Data"
              onClick={() => setShowLinks(false)}
              exact
            >
              Explore the Data
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={linkClasses}
              activeClassName={activeLinkClasses}
              onClick={() => setShowLinks(false)}
              aria-label="About Us"
              exact
            >
              About Us
            </NavLink>
          </li>
          {userRole === USER_ROLES.Admin && (
            <li>
              <NavLink
                to="/uploadData"
                className={linkClasses}
                activeClassName={activeLinkClasses}
                onClick={() => setShowLinks(false)}
                aria-label="Upload Data"
                exact
              >
                Upload Data
              </NavLink>
            </li>
          )}
          {userRole === USER_ROLES.Admin && (
            <li>
              <NavLink
                to="/roleApproval"
                className={linkClasses}
                activeClassName={activeLinkClasses}
                onClick={() => setShowLinks(false)}
                aria-label="Role Approval"
                exact
              >
                Role Approval
              </NavLink>
            </li>
          )}
          {userRole && (
            <li>
              <NavLink
                to="/logout"
                className={linkClasses}
                activeClassName={activeLinkClasses}
                onClick={() => setShowLinks(false)}
                aria-label="Logout"
                exact
              >
                Logout
              </NavLink>
            </li>
          )}

          <li>
            <a
              href="#donate"
              class={navButtonClasses}
              aria-label="Donate Now"
              onClick={() => setShowLinks(false)}
            >
              Donate Now
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBarMobile;
