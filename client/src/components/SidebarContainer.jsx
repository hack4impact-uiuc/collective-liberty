//@flow
import React, { useEffect, useState } from "react";
import SidebarChart from "./SidebarChart";
import { Doughnut } from "react-chartjs-2";
import { getArrestData } from "../utils/traffickingstatsapi";

import "../styles/SidebarContainer.css";

type Props = {
  city: String,
  state: String,
  range: [Int],
  setRange: ([Int]) => void,
  minTime: Int,
  maxTime: Int,
  step: Int,
};

const SidebarContainer = (props: Props) => {
  const { range, setRange, minTime, maxTime, step } = props;

  const [years, setYears] = useState([]);

  useEffect(() => {
    const newYears = [];
    for (let i = minTime; i <= maxTime; i += step) {
      newYears.push(i.toString());
    }
    setYears(newYears);
  }, [maxTime, minTime, setYears, step]);
  const { city, state, time_range } = props;
  const [arrestData, setArrestData] = useState(null);
  useEffect(async () => {
    await getArrestData({
      city: "",
      state: "Illinois",
      range: [2000, 2020],
    }).then((data) => {
      setArrestData(data);
    });
  }, []);

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
    <div className="flex flex-col bg-black p-6 shadow-md h-screen w-3/12 container">
      <h2 className="Title text-white">Name of Location</h2>
      <div className="flex flex-row text-grey">
        <select
          aria-label="beginning year of time range"
          className="text-gray-700 text-center inline-block px-4 py-2 m-0"
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
        <h1 className="text-gray-700 text-center inline-block py-2 m-2">to</h1>
        <select
          aria-label="ending year of time range"
          className="text-gray-700 text-center inline-block px-4 py-2 m-0"
          id="end"
          value={range[1]}
          onChange={(event) => setRange([range[0], event.target.value])}
        >
          {years.map((year) =>
            year >= range[0] ? <option aria-label={year}>{year}</option> : null
          )}
        </select>
      </div>

      <div className="TraffickingStats flex flex-row m-1 py-4 ">
        <div className="TraffickingScore ">
          <div className="score">
            <Doughnut
              data={donutData}
              width={7}
              height={7}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div className="score overlay text-white p-4 text-2xl">
            {arrestData && arrestData.arrestScore.toFixed(0)}
          </div>
        </div>
        <div className="ArrestTypes flex flex-col py-5">
          <h2 className="TraffickerArrests text-gray-500 text-sm">
            {" "}
            {arrestData && arrestData.traffickerArrestCount} Trafficker Arrests
          </h2>
          <hr size="5" width="90%" color="grey"></hr>
          <h2 className="VictimArrests text-gray-500 text-sm">
            {arrestData && arrestData.victimArrestCount} Victim Arrests
          </h2>
        </div>
        <div className="Separation flex flex-row px-1"></div>

        <div className="TotalCases flex flex-col ">
          <div className="totalCaseCount text-white px-5 text-3xl">
            {arrestData && arrestData.totalCaseCount}
          </div>
          <h2 className="totalCasesLabel text-gray-500 text-sm">Total Cases</h2>
        </div>
      </div>

      <SidebarChart arrests={null} laws={null} />
    </div>
  );
};
export default SidebarContainer;
