//@flow
import React, { useEffect, useState } from "react";
import SidebarChart from "./SidebarChart";
import { Doughnut } from "react-chartjs-2";
import { getArrestData } from "../utils/api";

import "../styles/SidebarContainer.css";

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

type Props = {
  city: String,
  state: String,
  range: [Int],
  setRange: ([Int]) => void,
  minTime: Int,
  maxTime: Int,
  step: Int,
  locationInfo: Object,
};

const SidebarContainer = (props: Props) => {
  const { range, setRange, minTime, maxTime, step, locationInfo } = props;

  const [years, setYears] = useState([]);
  const [arrestData, setArrestData] = useState(null);
  const [tab, setTab] = useState(0);



  useEffect(() => {
    const newYears = [];
    for (let i = minTime; i <= maxTime; i += step) {
      newYears.push(i.toString());
    }
    setYears(newYears);
  }, [maxTime, minTime, setYears, step]);

  useEffect(() => {
    async function fetchData() {
      await getArrestData({
        city: "",
        state: "Illinois",
        range: [2000, 2020],
      }).then((data) => {
        setArrestData(data);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(locationInfo);
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

  return (
    <div
      className="flex flex-col bg-black p-6 shadow-md h-full w-3/12 container"
      style={{ minHeight: "calc(100vh - 84px" }}
    >
      <h1 className="text-3xl font-extrabold text-white">
        {locationInfo.state || locationInfo.city || "Click a state"}
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



      <div class="tab flex flex-row m-1 pt-3 pb-1" style={{ 'border-bottom': '1.5em solid orange' }}>
        <button class="tablinks bg-orange-500 text-center text-white font-sans  w-1/3 py-2 px-4 text-xs rounded"
          style={{ 'background-color': tab === 0 ? 'darkorange' : 'grey' }}
          aria-label="Arrests"
          onClick={() => (setTab(0))}>
          Arrests</button>
        <button class="tablinks bg-orange-500 text-center text-white font-sans w-1/3 py-2 px-4 text-xs rounded"
          aria-label="Massage Parlor Laws"
          style={{ 'background-color': tab === 1 ? 'darkorange' : 'grey' }}
          onClick={() => (setTab(1))}>
          Massage Parlor Laws</button>
        <button class="tablinks bg-orange-500 text-center text-white font-sans w-1/3 py-2 px-4 text-xs rounded"
          aria-label="Vacatur Laws"
          style={{ 'background-color': tab === 2 ? 'darkorange' : 'grey' }}
          onClick={() => (setTab(2))}>
          Vacatur Laws</button>
        <button class="tablinks bg-orange-500 text-center text-white font-sans w-1/3 py-2 px-4 text-xs rounded"
          aria-label="Criminal Law"
          style={{ 'background-color': tab === 3 ? 'darkorange' : 'grey' }}
          onClick={() => (setTab(3))}>
          Criminal Law</button>

      </div>


      {tab === 0 ? (<div id="Arrests" class="tabcontent"
        style={{ visibility: tab === 0 ? 'visible' : 'hidden' }}>
        <SidebarChart arrests={null} laws={null} />
      </div>) : null}

      {tab === 1 ? (<div id="Massage Parlor Laws" class="tabcontent"
        style={{ visibility: tab === 1 ? 'visible' : 'hidden' }}>
        <h3>Massage Parlor Laws</h3>
      </div>) : null}
      {tab === 2 ? (<div id="Vacatur Laws" class="tabcontent"
        style={{ visibility: tab === 2 ? 'visible' : 'hidden' }}>
        <h3>Vacatur Laws</h3>
      </div>) : null}

      {tab === 3 ? (<div id="Criminal Law" class="tabcontent"
        style={{ visibility: tab === 3 ? 'visible' : 'hidden' }}>
        <h3>Criminal Law</h3>
      </div>) : null}




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
