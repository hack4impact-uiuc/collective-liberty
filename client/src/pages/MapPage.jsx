import React, { useState, useEffect, useCallback } from "react";
import Map from "../components/Map";
import TimeRange from "../components/TimeRange";
import SidebarContainer from "../components/SidebarContainer";
import useWindowDimensions from "../utils/mobile";

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
  const [incidents, setIncidents] = useState([]);
  const [locationInfo, setLocationInfo] = useState({
    state: null,
    city: null,
  });

  const [massageLaws, setMassageLaws] = useState([]);
  const [vacaturLaws, setVacaturLaws] = useState([]);
  const [criminalLaws, setCriminalLaws] = useState([]);
  const [activeMassageLaw, setActiveMassageLaw] = useState({});
  const [activeVacaturLaw, setActiveVacaturLaw] = useState(fakeVacatur);

  const [tab, setTab] = useState(0);
  const [layerData, setLayerData] = useState([]);
  const [firstIncidentsFetch, setFirstIncidentsFetch] = useState(false);
  const [vacaturModalVisible, setVacaturModalVisible] = useState(false);

  const [windowDimensions, isMobile] = useWindowDimensions();

  const fetchIncidents = async () => {
    const res = await getAllIncidents({ time_range: range });
    setIncidents(res);

    return res;
  };

  // these won't be re-fetched when user changes anything
  const fetchStaticLaws = async (params) => {
    setMassageLaws(await getMassageLaws());
    setVacaturLaws(await getVacaturLaws());
  };

  const fetchLocationalLaws = async (params) => {
    setCriminalLaws(
      await getCriminalLaws({ stateTerritory: params.state || "" })
    );
  };

  // on mount
  useEffect(() => {
    async function onLoad() {
      const incidentsList = await fetchIncidents();
      setLayerData(incidentsList);

      await fetchStaticLaws();
    }

    onLoad();
  }, []);

  // on range change
  useEffect(() => {
    fetchIncidents();
  }, [range]);

  // on location change
  useEffect(() => {
    fetchLocationalLaws(locationInfo);
    setActiveVacaturLaw(
      vacaturLaws.find(
        (law) => law.state.toLowerCase() === locationInfo.state.toLowerCase()
      ) || {}
    );

    setActiveMassageLaw(
      massageLaws.find(
        (law) => law.state.toLowerCase() === locationInfo.state.toLowerCase()
      ) || {}
    );
  }, [locationInfo.state]);

  // Update data being fed into deck layer upon tab switch
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
  }, [tab, incidents]);

  return (
    <>
      <Map
        incidents={incidents}
        setLocationInfo={setLocationInfo}
        tab={tab}
        layerData={layerData}
        setVacaturModalVisible={setVacaturModalVisible}
        vacaturModalVisible={vacaturModalVisible}
      />
      <SidebarContainer
        range={range}
        setRange={setRange}
        minTime={minTime}
        maxTime={maxTime}
        step={step}
        locationInfo={locationInfo}
        setLocationInfo={setLocationInfo}
        criminalLaws={
          locationInfo.state
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
