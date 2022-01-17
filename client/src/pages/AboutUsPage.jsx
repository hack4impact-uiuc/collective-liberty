import React from "react";
import h4iLogo from "../imgs/h4i-logo.svg";
import colibLogo from "../imgs/colib-logo.svg";

import "boxicons";
import "../styles/RoleApprovalPage.css";

const AboutUsPage = () => {
  return (
    <div className="uploadContainer w-3/5 m-auto relative">
      <h1 className="text-xl font-bold my-4">About Us</h1>
      <div className="flex justify-center items-center mb-8">
        <img
          className="mr-4"
          align="center"
          width="153"
          height="70"
          src={colibLogo}
          alt="Collective Liberty Logo"
        />
        <box-icon name="x"></box-icon>
        <img
          className="ml-4"
          align="center"
          width="153"
          height="70"
          src={h4iLogo}
          alt="Hack4Impact Logo"
        />
      </div>
      <div className="text-center">
        <p>
          This app was developed by{" "}
          <a className="txt-blue" href="https://uiuc.hack4impact.org/">
            Hack4Impact UIUC
          </a>
          .
        </p>
        <p>
          Cartographic boundaries provided by the{" "}
          <a className="txt-blue" href="https://www.census.gov/en.html">
            United States Census Bureau
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
