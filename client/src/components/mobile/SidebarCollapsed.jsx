import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { USER_ROLES } from "../../utils/constants";
import { useAuth } from "../../utils/useAuth";
import { getUserRole } from "../../utils/api";

import "../desktop/SidebarContainer/SidebarContainer.scss";

import "boxicons";

const SidebarCollapsed = (props) => {
  const {
    range,
    setRange,
    minTime,
    maxTime,
    step,
    locationInfo,
    setLocationInfo,
    criminalLaws,
    activeVacaturLaw,
    activeMassageLaw,
    tab,
    setTab,
    setVacaturModalVisible,
    collapsed,
    setCollapsed,
  } = props;

  return (
    <div className="mini-sidebar w-full bg-black">
      <div className="flex items-center justify-between pt-2">
        <div className="ml-4">
          <h1 className="mini-sidebar-text inline-block font-extrabold text-white mr-2">
            {(locationInfo.city &&
              `${locationInfo.city}, ${locationInfo.state}`) ||
              locationInfo.state ||
              "Click a State"}
          </h1>
          {locationInfo.state && (
            <button
              className="inline-block white-x"
              onClick={() => setLocationInfo({ city: "", state: "" })}
            >
              &times;
            </button>
          )}
        </div>
        <button
          className="collapse-btn inline-block white-x"
          onClick={() => setCollapsed(false)}
        >
          &#8964;
        </button>
      </div>
      <div className="txt-gray ml-4">
        <p className="txt-gray">Read more...</p>
      </div>
    </div>
  );
};

export default SidebarCollapsed;
