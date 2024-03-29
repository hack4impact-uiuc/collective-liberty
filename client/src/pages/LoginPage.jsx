import React, { useState } from "react";
import { formatAPILink } from "../utils/api";
import colibLogo from '../imgs/colib-logo.svg'

import "./../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div>
      <div className="loginCard">
        <div className="loginImg">
          <img
            align="center"
            width="160"
            height="72"
            src={colibLogo}
            alt="Collective Liberty Logo"
          />
        </div>
        <br />
        <a className="loginAsAdmin">
          <span>Login as an Administrator</span>
        </a>
        <br />
        <br />
        <a className="loginWithGoogle" href={formatAPILink("/login")}>
          <img
            width="25"
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
            id="googleLogo"
          />
          <span>Login with Google</span>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
