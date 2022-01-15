import React, { useState, useEffect, useCallback } from "react";
import Map from "../components/Map";
import TimeRange from "../components/TimeRange";
import SidebarCommon from "../components/SidebarCommon";
import useWindowDimensions from "../utils/mobile";
import { useDebounce } from "../utils/useDebounce";

import {
  getAllIncidents,
  getCriminalLaws,
  getVacaturLaws,
  getMassageLaws,
} from "../utils/api";

import {
  ARRESTS_TAB,
  MASSAGE_PARLOR_LAWS_TAB,
  VACATUR_LAWS_TAB,
  CRIMINAL_LAWS_TAB,
} from "../utils/constants.js";

import "boxicons";

import "./../styles/MapPage.css";

// Constants to be changed later depending on actual data and how we want to use timerange
const initRange = [2004, 2008];
const minTime = 2000;
const maxTime = 2020;
const step = 1;

const fakeVacatur = {
  state: "Illinois",
  anyTypeCivilRemedy: true,
  offersVacatur: "Juvenile Only",
  offersClemency: "No",
  OffersExpungement: "Yes",
  rank: "Needs Improvement",
};

const MapPage = () => {
  const [range, setRange] = useState(initRange);
  const debouncedRange = useDebounce(range, 500);

  const [incidents, setIncidents] = useState([]);
  const [locationInfo, setLocationInfo] = useState({
    state: null,
    city: null,
  });

  const [massageLaws, setMassageLaws] = useState([]);
  const [vacaturLaws, setVacaturLaws] = useState([]);
  const [criminalLaws, setCriminalLaws] = useState([]);

  const activeMassageLaw = locationInfo.state
    ? massageLaws.find(
        (law) => law.state.toLowerCase() === locationInfo.state.toLowerCase()
      )
    : massageLaws?.[0];

  const activeVacaturLaw = locationInfo.state
    ? vacaturLaws.find(
        (law) => law.state.toLowerCase() === locationInfo.state.toLowerCase()
      )
    : massageLaws?.[0];

  const [tab, setTab] = useState(0);
  const [layerData, setLayerData] = useState([]);
  const [firstIncidentsFetch, setFirstIncidentsFetch] = useState(false);
  const [vacaturModalVisible, setVacaturModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [, isMobile] = useWindowDimensions();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);

  const fetchIncidents = useCallback(async () => {
    const res = await getAllIncidents({ time_range: range });
    setIncidents(res);

    return res;
  });

  // these won't be re-fetched when user changes anything
  const fetchStaticLaws = async () => {
    setMassageLaws(await getMassageLaws());
    setVacaturLaws(await getVacaturLaws());
    setCriminalLaws(
      await getCriminalLaws({ stateTerritory: locationInfo.state || "" })
    );
  };

  // on mount
  useEffect(() => {
    async function onLoad() {
      setIsLoading(true);
      const incidentsList = await fetchIncidents();
      setLayerData(incidentsList);

      await fetchStaticLaws();
      setIsLoading(false);
    }

    onLoad();
  }, []);

  // on range change
  useEffect(() => {
    fetchIncidents();
  }, [debouncedRange]);

  useEffect(() => {
    switch (tab) {
      case ARRESTS_TAB:
        setLayerData(incidents);
        break;
      case MASSAGE_PARLOR_LAWS_TAB:
        setLayerData(massageLaws);
        break;
      case VACATUR_LAWS_TAB:
        setLayerData(vacaturLaws);
        break;
      case CRIMINAL_LAWS_TAB:
        setLayerData(criminalLaws);
        break;
      default:
        break;
    }
  }, [tab, incidents, massageLaws, vacaturLaws, criminalLaws]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Map
        incidents={incidents}
        setLocationInfo={setLocationInfo}
        tab={tab}
        layerData={layerData}
        setVacaturModalVisible={setVacaturModalVisible}
        vacaturModalVisible={vacaturModalVisible}
        sidebarCollapsed={sidebarCollapsed}
      />
      <SidebarCommon
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        range={debouncedRange}
        setRange={setRange}
        minTime={minTime}
        maxTime={maxTime}
        step={step}
        locationInfo={locationInfo}
        setLocationInfo={setLocationInfo}
        criminalLaws={
          locationInfo &&
          locationInfo.state &&
          criminalLaws !== undefined &&
          criminalLaws !== null
            ? criminalLaws.filter(
                (e) =>
                  e.stateTerritory.toLowerCase() ===
                  locationInfo.state.toLowerCase()
              )[0]
            : null
        }
        activeVacaturLaw={activeVacaturLaw}
        activeMassageLaw={activeMassageLaw}
        tab={tab}
        setTab={setTab}
        setVacaturModalVisible={setVacaturModalVisible}
      />

      {!isMobile && (
        <div className="timeRange">
          <TimeRange
            range={range}
            setRange={setRange}
            minTime={minTime}
            maxTime={maxTime}
            step={step}
            tab={tab}
          />
        </div>
      )}
    </>
  );
};

export default MapPage;
