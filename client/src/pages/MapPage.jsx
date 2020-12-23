import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import TimeRange from "../components/TimeRange";
import SidebarContainer from "../components/SidebarContainer";

import { getAllIncidents, getCriminalLaws } from "../utils/api";

import "boxicons";

import "./../styles/MapPage.css";

// Constants to be changed later depending on actual data and how we want to use timerange
const initRange = [2004, 2008];
const minTime = 2000;
const maxTime = 2020;
const step = 1;

const MapPage = () => {
  const [range, setRange] = useState(initRange);
  const [incidents, setIncidents] = useState([]);
  const [locationInfo, setLocationInfo] = useState({
    state: null,
    city: null,
  });

  const [criminalLaws, setCriminalLaws] = useState([]);

  const [tab, setTab] = useState(2);

  const fetchIncidents = async (params) => {
    const res = await getAllIncidents(params);
    setIncidents(res);
  };

  const fetchCriminalLaws = async (data) => {
    const res = await getCriminalLaws(data);
    setCriminalLaws(res);
  };

  useEffect(() => {
    fetchIncidents({
      time_range: range,
    });
  }, [range]);

  useEffect(() => {
    fetchCriminalLaws();
  }, []);

  return (
    <>
      <Map incidents={incidents} setLocationInfo={setLocationInfo} tab={tab}/>
      <SidebarContainer
        range={range}
        setRange={setRange}
        minTime={minTime}
        maxTime={maxTime}
        step={step}
        locationInfo={locationInfo}
        criminalLaws={
          locationInfo.state
            ? criminalLaws.filter(
                (e) => e.stateTerritory === locationInfo.state.toLowerCase()
              )[0]
            : null
        }
        tab={tab}
        setTab={setTab}
      />
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
