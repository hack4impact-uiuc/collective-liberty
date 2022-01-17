//@flow
import React, { useEffect, useState } from "react";
import SidebarChart from "../../SidebarChart";
import VacaturSidebar from "../../VacaturSidebar";
import { Doughnut } from "react-chartjs-2";
import { getArrestData } from "../../../utils/api";
import {
  ARRESTS_TAB,
  MASSAGE_PARLOR_LAWS_TAB,
  VACATUR_LAWS_TAB,
  CRIMINAL_LAWS_TAB,
  VACATUR_LAWS_COLORS,
  CRIMINAL_LAWS_COLORS,
  MASSAGE_PARLOR_LAW_COLORS,
} from "../../../utils/constants";

import { getYearlyData } from "../../../utils/api";

import "./SidebarContainer.scss";
import MassageParlorSidebar from "../../MassageParlorSidebar";
import ArrestsSidebar from "../../ArrestsSidebar";
import useWindowDimensions from "../../../utils/mobile";

import "boxicons";

const DropdownArrow = () => (
  <div className="dropdownArrow">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

const LawRatingIndicator = ({ color }) => (
  <span
    style={{
      display: "inline-block",
      width: "1em",
      height: "1em",
      marginBottom: "-0.125em",
      marginRight: "0.5em",
      borderRadius: "50%",
      backgroundColor: color,
    }}
  />
);

type PropTypes = {
  city: string,
  state: string,
  range: [number, number],
  setRange: ([number]) => void,
  minTime: number,
  maxTime: number,
  step: number,
  locationInfo: Object,
  setLocationInfo: () => void,
  criminalLaws: Array<Object>,
  activeVacaturLaw: Object,
  activeMassageLaw: Object,
  tab: number,
  setTab: (newTab: number) => void,
  setVacaturModalVisible: () => void,
};

const SidebarContainer = (props: PropTypes) => {
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

  const [years, setYears] = useState([]);
  const [arrestData, setArrestData] = useState(null);
  const [lawData, setLawData] = useState({});
  const [, isMobile] = useWindowDimensions();

  useEffect(() => {
    setLawData({
      stateCriminalLaws: "Very Bad",
      massageParlorLaws: activeMassageLaw.strengthOfLaw,
      vacaturLaws: activeVacaturLaw.rank,
    });
  }, [activeMassageLaw.strengthOfLaw, activeVacaturLaw.rank]);

  useEffect(() => {
    const newYears = [];
    for (let i = minTime; i <= maxTime; i += step) {
      newYears.push(i.toString());
    }
    setYears(newYears);
  }, [maxTime, minTime, setYears, step]);

  useEffect(() => {
    async function fetchArrestData() {
      await getArrestData({
        city: locationInfo.city || "",
        state: locationInfo.state || "",
        range,
      }).then((data) => {
        setArrestData(data);
      });
    }

    fetchArrestData();
  }, [locationInfo, range]);

  const lerpDoughnutColor = (score) => {
    const green = { r: 60, g: 179, b: 113 };
    const yellow = { r: 222, g: 213, b: 91 };
    const red = { r: 222, g: 91, b: 91 };
    let final = { r: 255, g: 255, b: 255 };

    const percentage = score / 100;

    if (percentage <= 0) return final;
    if (percentage <= 0.5) {
      const t = percentage / 0.5;

      final = {
        r: (yellow.r - red.r) * t + yellow.r,
        g: (yellow.g - red.g) * t + yellow.g,
        b: (yellow.b - red.b) * t + yellow.b,
      };
    }

    if (percentage <= 1) {
      const t = (percentage - 0.5) / 0.5;

      final = {
        r: (green.r - yellow.r) * t + yellow.r,
        g: (green.g - yellow.g) * t + yellow.g,
        b: (green.b - yellow.b) * t + yellow.b,
      };
    }

    return `rgba(${final.r}, ${final.g}, ${final.b}, 1)`;
  };

  const arrestScore = arrestData ? arrestData.arrestScore : 0;
  const donutData = {
    datasets: [
      {
        label: "State score",
        data: [100 - arrestScore, arrestScore],
        backgroundColor: [
          "rgba(255, 255, 255, 1)",
          lerpDoughnutColor(arrestScore),
        ],
        borderColor: ["rgba(255, 255, 255, 1)", lerpDoughnutColor(arrestScore)],
        borderWidth: 1,
        weight: 4,
      },
    ],
  };

  const buildSummary = (summary) => {
    if (!summary) return [];
    return summary
      .replace("\n", " ")
      .trim()
      .split("*")
      .filter((note) => note !== "");
  };

  const getYearFromDate = (str) => {
    const dateObj = new Date(str);
    return dateObj.getFullYear();
  };

  const renderTab = () => {
    let renderable = null;

    switch (tab) {
      case ARRESTS_TAB:
        renderable = (
          <div
            id="Arrests"
            className="tabcontent"
            style={{ visibility: tab === ARRESTS_TAB ? "visible" : "hidden" }}
          >
            <ArrestsSidebar locationInfo={locationInfo} range={range} />
          </div>
        );
        break;
      case MASSAGE_PARLOR_LAWS_TAB:
        renderable = (
          <div
            id="Massage Parlor Laws"
            className="tabcontent"
            style={{
              visibility:
                tab === MASSAGE_PARLOR_LAWS_TAB ? "visible" : "hidden",
            }}
          >
            <MassageParlorSidebar locationInfo={locationInfo} range={range} />
          </div>
        );
        break;
      case VACATUR_LAWS_TAB:
        renderable = (
          <div
            id="Vacatur Laws"
            className="tabcontent"
            style={{
              visibility: tab === VACATUR_LAWS_TAB ? "visible" : "hidden",
            }}
          >
            <VacaturSidebar
              vacatur={activeVacaturLaw}
              setVacaturModalVisible={setVacaturModalVisible}
            />
          </div>
        );
        break;
      case CRIMINAL_LAWS_TAB:
        renderable = (
          <div
            id="Criminal Laws"
            className="tabcontent"
            style={{
              visibility: tab === CRIMINAL_LAWS_TAB ? "visible" : "hidden",
              paddingTop: "1.5em",
            }}
          >
            {criminalLaws ? (
              <>
                <h3 style={{ color: "#C4C4C4" }}>
                  {criminalLaws.stateTerritory} Criminal Laws as of{" "}
                  {getYearFromDate(criminalLaws.datePassed)}
                </h3>
                <ul>
                  {buildSummary(criminalLaws.summary).map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No data available.</p>
            )}
          </div>
        );
        break;
      default:
        break;
    }

    return renderable;
  };

  return (
    <div
      className="sidebar-container"
      style={{
        height: isMobile ? "calc(100vh)" : "calc(100vh - 84px)",
        position: "relative",
      }}
    >
      <div className="location">
        <div>
          <h1>
            {(locationInfo.city &&
              `${locationInfo.city}, ${locationInfo.state}`) ||
              locationInfo.state ||
              "Click a State"}
          </h1>
          {locationInfo.state && (
            <button
              className="close"
              onClick={() => setLocationInfo({ city: "", state: "" })}
            >
              &times;
            </button>
          )}
        </div>
        {isMobile && (
          <button className="close" onClick={() => setCollapsed(true)}>
            &#8964;
          </button>
        )}
      </div>
      <div className="query">
        {tab === ARRESTS_TAB || tab === MASSAGE_PARLOR_LAWS_TAB ? (
          <div>
            <div className="select-wrapper">
              <select
                aria-label="beginning year of time range"
                id="start"
                value={range[0]}
                onChange={(event) =>
                  setRange([Number(event.target.value), range[1]])
                }
              >
                {years.map((year) =>
                  Number(year) <= range[1] ? (
                    <option aria-label={year} value={year}>
                      {year}
                    </option>
                  ) : null
                )}
              </select>
              <DropdownArrow />
            </div>
            <p className="range-to">to</p>
            <div className="select-wrapper">
              <select
                aria-label="ending year of time range"
                id="end"
                value={range[1]}
                onChange={(event) => setRange([range[0], event.target.value])}
              >
                {years.map((year) =>
                  Number(year) >= range[0] ? (
                    <option aria-label={year}>{year}</option>
                  ) : null
                )}
              </select>
              <DropdownArrow />
            </div>
          </div>
        ) : (
          <p className="allAvailableData">All Available Data</p>
        )}
      </div>

      <div className="TraffickingStats">
        <div className="TraffickingScore">
          <div className="score">
            <Doughnut
              data={donutData}
              options={{
                maintainAspectRatio: true,
                cutoutPercentage: 72,
                events: [],
              }}
            />
            <div className="numericScore">
              {arrestData && arrestData.arrestScore.toFixed(0)}
            </div>
          </div>
        </div>
        <div className="ArrestTypes">
          <h2 className="TraffickerArrests">
            {" "}
            {arrestData && arrestData.traffickerArrestCount} Trafficker Arrests
          </h2>
          <hr size="5" width="100%" color="#cccccc" />
          <h2 className="VictimArrests">
            {arrestData && arrestData.victimArrestCount} Victim Arrests
          </h2>
        </div>
        <div className="Separation"></div>
        <div className="TotalCases">
          <div className="totalCaseCount">
            {arrestData && arrestData.totalCaseCount}
          </div>
          <h2 className="totalCasesLabel">Total Cases</h2>
        </div>
      </div>

      <section className="law-ratings">
        <table>
          <thead>
            <tr>
              <th>Law Ratings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Massage Parlor Laws</td>
              <td>
                <LawRatingIndicator
                  color={
                    lawData && lawData.massageParlorLaws
                      ? MASSAGE_PARLOR_LAW_COLORS[lawData.massageParlorLaws]
                      : "#939393"
                  }
                />
                {lawData && lawData.massageParlorLaws
                  ? lawData.massageParlorLaws
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>Vacatur Laws</td>
              <td>
                <LawRatingIndicator
                  color={
                    lawData && lawData.vacaturLaws
                      ? VACATUR_LAWS_COLORS[lawData.vacaturLaws]
                      : "#939393"
                  }
                />
                {lawData && lawData.vacaturLaws ? lawData.vacaturLaws : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="tab">
        <button
          className="tablinks"
          style={{
            "background-color": tab === ARRESTS_TAB ? "#f07533" : "grey",
          }}
          aria-label="Arrests"
          onClick={() => setTab(ARRESTS_TAB)}
        >
          Arrests
        </button>
        <button
          className="tablinks"
          aria-label="Massage Parlor Laws"
          style={{
            "background-color":
              tab === MASSAGE_PARLOR_LAWS_TAB ? "#f07533" : "grey",
          }}
          onClick={() => setTab(MASSAGE_PARLOR_LAWS_TAB)}
        >
          Massage Parlor Laws
        </button>
        <button
          className="tablinks"
          aria-label="Vacatur Laws"
          style={{
            "background-color": tab === VACATUR_LAWS_TAB ? "#f07533" : "grey",
          }}
          onClick={() => setTab(VACATUR_LAWS_TAB)}
        >
          Vacatur Laws
        </button>
        <button
          className="tablinks"
          aria-label="Criminal Laws"
          style={{
            "background-color": tab === CRIMINAL_LAWS_TAB ? "#f07533" : "grey",
          }}
          onClick={() => setTab(CRIMINAL_LAWS_TAB)}
        >
          Criminal Laws
        </button>
      </div>
      {renderTab()}
      {/* 
      <div className="journeysButton flex justify-center mt-10">
        <button
          aria-label="view journeys"
          className="Journeys bg-orange-500 text-center text-white font-sans py-2 px-4 rounded"
        >
          VIEW JOURNEYS
        </button>
      </div> */}
    </div>
  );
};

export default SidebarContainer;
