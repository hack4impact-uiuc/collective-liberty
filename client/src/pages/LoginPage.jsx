import React, { useState } from "react";

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
            src="https://collectiveliberty.org/wp-content/uploads/2020/04/cropped-CollectiveLiberty_FullLogo_01_hi.png"
            alt="Collective Liberty Logo"
          />
        </div>
        <br />
        <a className="loginAsAdmin">
          <span>Login as an Administrator</span>
        </a>
        <br />
        <br />
        <a className="loginWithGoogle" href={"http://localhost:5000/api/login"}>
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
