//@flow
import React, { useEffect, useState } from "react";
import SidebarChart from "./SidebarChart";
import VacaturSidebar from "./VacaturSidebar";
import { Doughnut } from "react-chartjs-2";
import { getArrestData } from "../utils/api";
import {
  ARRESTS_TAB,
  MASSAGE_PARLOR_LAWS_TAB,
  VACATUR_LAWS_TAB,
  CRIMINAL_LAWS_TAB,
  VACATUR_LAWS_COLORS,
  CRIMINAL_LAWS_COLORS,
  MASSAGE_PARLOR_LAW_COLORS,
} from "../utils/constants";

import { getYearlyData } from "../utils/api";

import "../styles/SidebarContainer.css";
import MassageParlorSidebar from "./MassageParlorSidebar";
import {
  ARRESTS_CHART_TITLE,
  MASSAGE_LAWS_CHART_TITLE,
} from "../utils/constants";

const selectClasses =
  "block appearance-none bg-black txt-gray font-semibold text-lg pl-0 py-2 pr-6 rounded leading-tight focus:outline-none";

const DropdownArrow = () => (
  <div class="pointer-events-none absolute inset-y-0 mb-0 right-0 text-lg flex items-center px-2 txt-gray">
    <svg
      class="fill-current h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
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
  criminalLaws: Object,
  tab: number,
  setTab: (newTab: number) => void,
};

const SidebarContainer = (props: PropTypes) => {
  const {
    range,
    setRange,
    minTime,
    maxTime,
    step,
    locationInfo,
    criminalLaws,
    tab,
    setTab,
  } = props;

  const [years, setYears] = useState([]);
  const [arrestData, setArrestData] = useState(null);
  const [lawData, setLawData] = useState({});
  const [yearlyArrestData, setYearlyArrestData] = useState([]);

  useEffect(() => {
    setLawData({
      stateCriminalLaws: "Very Bad",
      massageParlorLaws: "Bad",
      vacaturLaws: "Needs Improvement",
    });
  }, []);

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
  }, [locationInfo, locationInfo.city, locationInfo.state, range]);

  useEffect(() => {
    async function fetchYearlyData() {
      await getYearlyData({
        city: locationInfo.city || "",
        state: locationInfo.state || "",
        time_range: range,
      }).then((data) => {
        setYearlyArrestData(data);
      });
    }

    fetchYearlyData();
  }, [locationInfo, locationInfo.city, locationInfo.state, range]);

  const donutData = {
    datasets: [
      {
        label: "State score",
        data: [
          100 - (arrestData ? arrestData.arrestScore : 0),
          arrestData ? arrestData.arrestScore : 0,
        ],
        backgroundColor: ["rgba(255, 255, 255, 1)", "rgba(60, 179, 113, 1)"],
        borderColor: ["rgba(255, 255, 255, 1)", "rgba(60, 179, 113, 1)"],
        borderWidth: 1,
        weight: 4,
      },
    ],
  };

  const buildSummary = (summary) => {
    if (!summary) return [];
    return summary.replace("\n", " ").split("*");
  };

  const getYearFromDate = (str) => {
    const dateObj = new Date(str);
    return dateObj.getFullYear();
  };

  const arrestChartData = {
    labels: [...Array(range[1] - range[0] + 1).keys()].map(
      (year) => year + range[0]
    ),
    datasets: [
      {
        label: "Arrests",
        fill: false,
        lineTension: 0,
        backgroundColor: "#F07533",
        borderColor: "#F07533",
        borderWidth: 3,
        pointRadius: 0,
        hitRadius: 7,
        data: yearlyArrestData,
      },
    ],
  };

  const renderTab = () => {
    let renderable = null;

    switch (tab) {
      case ARRESTS_TAB:
        renderable = (
          <div
            id="Arrests"
            class="tabcontent"
            style={{ visibility: tab === ARRESTS_TAB ? "visible" : "hidden" }}
          >
            <SidebarChart
              title={ARRESTS_CHART_TITLE}
              arrests={yearlyArrestData}
              arrestsDataLabel={"Arrests"}
              laws={null}
              range={range}
            />
          </div>
        );
        break;
      case MASSAGE_PARLOR_LAWS_TAB:
        renderable = (
          <div
            id="Massage Parlor Laws"
            class="tabcontent"
            style={{
              visibility:
                tab === MASSAGE_PARLOR_LAWS_TAB ? "visible" : "hidden",
            }}
          >
            <MassageParlorSidebar
              chartTitle={MASSAGE_LAWS_CHART_TITLE}
              locationInfo={locationInfo}
              range={range}
            />
          </div>
        );
        break;
      case VACATUR_LAWS_TAB:
        renderable = (
          <div
            id="Vacatur Laws"
            class="tabcontent"
            style={{
              visibility: tab === VACATUR_LAWS_TAB ? "visible" : "hidden",
            }}
          >
            <VacaturSidebar vacatur={null} />
          </div>
        );
        break;
      case CRIMINAL_LAWS_TAB:
        renderable = (
          <div
            id="Criminal Laws"
            class="tabcontent"
            style={{
              visibility: tab === CRIMINAL_LAWS_TAB ? "visible" : "hidden",
              paddingTop: "1.5em",
            }}
          >
            {criminalLaws && (
              <>
                <h3 style={{ color: "#C4C4C4" }}>
                  {criminalLaws.stateTerritory} Criminal Laws as of{" "}
                  {getYearFromDate(criminalLaws.datePassed)}
                </h3>
                <ul className="pl-5 list-disc">
                  {buildSummary(criminalLaws.summary).map((e) => (
                    <li key={e} className="text-white text-sm">
                      {e}
                    </li>
                  ))}
                </ul>
              </>
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
      className="flex flex-col bg-black p-6 shadow-md h-full w-3/12 container"
      style={{ minHeight: "calc(100vh - 84px", position: "relative" }}
    >
      <h1 className="text-3xl font-extrabold text-white">
        {locationInfo.state || locationInfo.city || "Click a State"}
      </h1>
      <div className="flex flex-row txt-grey">
        <div className="inline-block relative">
          <select
            aria-label="beginning year of time range"
            className={selectClasses}
            id="start"
            value={range[0]}
            onChange={(event) => setRange([event.target.value, range[1]])}
          >
            {years.map((year) =>
              year <= range[1] ? (
                <option aria-label={year} value={year}>
                  {year}
                </option>
              ) : null
            )}
          </select>
          <DropdownArrow />
        </div>
        <p className="txt-gray text-xl text-center inline-block pt-1 pr-1">
          to
        </p>
        <div className="inline-block relative">
          <select
            aria-label="ending year of time range"
            className={selectClasses}
            id="end"
            value={range[1]}
            onChange={(event) => setRange([range[0], event.target.value])}
          >
            {years.map((year) =>
              year >= range[0] ? (
                <option aria-label={year}>{year}</option>
              ) : null
            )}
          </select>
          <DropdownArrow />
        </div>
      </div>

      <div className="TraffickingStats flex flex-row m-1 pt-3 pb-1">
        <div className="TraffickingScore w-full relative" style={{ flex: 1 }}>
          <div className="score">
            <Doughnut
              data={donutData}
              options={{ maintainAspectRatio: true, cutoutPercentage: 72 }}
            />
          </div>
          <div
            className="score overlay absolute text-white font-semibold p-4 text-2xl"
            style={{
              top: "7.5px",
              left: "calc(50% - 1.667vw)",
              textAlign: "center",
            }}
          >
            {arrestData && arrestData.arrestScore.toFixed(0)}
          </div>
        </div>
        <div
          className="ArrestTypes flex flex-col pt-5 ml-5 -mt-1"
          style={{ flex: 3 }}
        >
          <h2 className="TraffickerArrests txt-gray text-sm">
            {" "}
            {arrestData && arrestData.traffickerArrestCount} Trafficker Arrests
          </h2>
          <hr size="5" className="my-1" width="90%" color="#cccccc"></hr>
          <h2 className="VictimArrests txt-gray text-sm">
            {arrestData && arrestData.victimArrestCount} Victim Arrests
          </h2>
        </div>
        <div className="Separation flex flex-row px-1 mt-1"></div>
        <div
          className="TotalCases flex flex-col"
          style={{ flex: 2, alignItems: "center" }}
        >
          <div className="totalCaseCount text-white px-5 text-3xl mt-2">
            {arrestData && arrestData.totalCaseCount}
          </div>
          <h2 className="totalCasesLabel txt-gray text-sm -mt-1">
            Total Cases
          </h2>
        </div>
      </div>

      <section className="law-ratings mt-3">
        <table>
          <thead>
            <tr>
              <th>Law Ratings</th>
            </tr>
          </thead>
          <tbody>
            {lawData?.stateCriminalLaws && (
              <tr>
                <td>State Criminal Laws</td>
                <td>
                  <LawRatingIndicator
                    color={CRIMINAL_LAWS_COLORS[lawData.stateCriminalLaws]}
                  />
                  {lawData.stateCriminalLaws}
                </td>
              </tr>
            )}
            {lawData?.massageParlorLaws && (
              <tr>
                <td>Massage Parlor Laws</td>
                <td>
                  <LawRatingIndicator
                    color={MASSAGE_PARLOR_LAW_COLORS[lawData.massageParlorLaws]}
                  />
                  {lawData.massageParlorLaws}
                </td>
              </tr>
            )}
            {lawData?.vacaturLaws && (
              <tr>
                <td>Vacatur Laws</td>
                <td>
                  <LawRatingIndicator
                    color={VACATUR_LAWS_COLORS[lawData.vacaturLaws]}
                  />
                  {lawData.vacaturLaws}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <div class="tab flex flex-row mb-0 pt-3 pb-0">
        <button
          class="tablinks bg-orange text-center text-white font-sans  w-1/4 -mb-3 px-4 py-2 text-xs rounded"
          style={{
            "background-color": tab === ARRESTS_TAB ? "#f07533" : "grey",
            position: "relative",
          }}
          aria-label="Arrests"
          onClick={() => setTab(ARRESTS_TAB)}
        >
          Arrests
        </button>
        <button
          class="tablinks bg-orange text-center text-white font-sans w-1/4 -mb-3 px-4 py-2 text-xs rounded"
          aria-label="Massage Parlor Laws"
          style={{
            "background-color":
              tab === MASSAGE_PARLOR_LAWS_TAB ? "#f07533" : "grey",
            position: "relative",
          }}
          onClick={() => setTab(MASSAGE_PARLOR_LAWS_TAB)}
        >
          Massage Parlor Laws
        </button>
        <button
          class="tablinks bg-orange text-center text-white font-sans w-1/4 -mb-3 px-4 py-2 text-xs rounded"
          aria-label="Vacatur Laws"
          style={{
            "background-color": tab === VACATUR_LAWS_TAB ? "#f07533" : "grey",
            position: "relative",
          }}
          onClick={() => setTab(VACATUR_LAWS_TAB)}
        >
          Vacatur Laws
        </button>
        <button
          class="tablinks bg-orange text-center text-white font-sans w-1/4  -mb-3 px-4 py-2 text-xs rounded"
          aria-label="Criminal Laws"
          style={{
            "background-color": tab === CRIMINAL_LAWS_TAB ? "#f07533" : "grey",
            position: "relative",
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
