import React, { useState } from "react";
import Map from "../components/Map";
import TimeRange from "../components/TimeRange";
import SidebarContainer from "../components/SidebarContainer";

import "./../styles/MapPage.css";

// Constants to be changed later depending on actual data and how we want to use timerange
const initRange = [2004, 2008];
const minTime = 2000;
const maxTime = 2020;
const step = 1;

const MapPage = () => {
  const [range, setRange] = useState(initRange);

  return (
    <>
      <Map />
      <SidebarContainer />
      <div className="timeRange">
        <TimeRange
          range={range}
          setRange={setRange}
          minTime={minTime}
          maxTime={maxTime}
          step={step}
        />
      </div>
    </>
  );
};

export default MapPage;
