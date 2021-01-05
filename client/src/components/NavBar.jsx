import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { USER_ROLES } from "../utils/constants";
import {useAuth} from '../utils/useAuth';

// styles
const linkClasses =
  "block lg:inline-block lg:mt-0 p-8 text-md font-semibold txt-dark-green px-16 border-b-4 border-white hover-border-dark-green";
const activeLinkClasses =
  "text-white bg-dark-green border-b-4 border-dark-green";
const navButtonClasses =
  "block lg:inline-block lg:mt-0 p-6 pr-12 pl-12 mr-4 ml-4 text-white text-md font-semibold bg-orange rounded";

const NavBar = () => {
  const {authed, role: userRole} = useAuth();

  return (
    <nav class="flex items-center justify-between flex-wrap">
      <div class="flex items-center flex-shrink-0 text-white mx-5">
        <img
          align="center"
          width="160"
          height="72"
          src="https://collectiveliberty.org/wp-content/uploads/2020/04/cropped-CollectiveLiberty_FullLogo_01_hi.png"
          alt="Collective Liberty Logo"
        />
      </div>
      <ul class="w-full block justify-end lg:flex lg:items-center lg:w-auto leading-none text-md lg:flex-grow">
        <li>
          <NavLink
            to="/"
            className={linkClasses}
            activeClassName={activeLinkClasses}
            aria-label="Explore the Data"
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
            aria-label="About Us"
            exact
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to={userRole == USER_ROLES.Admin ? "/uploadData" : "/login"}
            className={linkClasses}
            activeClassName={activeLinkClasses}
            aria-label="Upload Data"
            exact
          >
            {userRole === USER_ROLES.Admin ? "Upload Data" : "Login"}
          </NavLink>
        </li>

        {userRole === USER_ROLES.Admin && (
          <li>
            <NavLink
              to="/roleApproval"
              className={linkClasses}
              activeClassName={activeLinkClasses}
              aria-label="Role Approval"
              exact
            >
              Role Approval
            </NavLink>
          </li>
        )}
        {userRole === USER_ROLES.Admin && (
          <li>
            <NavLink
              to="/logout"
              className={linkClasses}
              activeClassName={activeLinkClasses}
              aria-label="Logout"
              exact
            >
              Logout
            </NavLink>
          </li>
        )}

        <li>
          <a href="#donate" class={navButtonClasses} aria-label="Donate Now">
            Donate Now
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
