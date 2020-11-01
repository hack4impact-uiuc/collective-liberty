import React, { useEffect, useState } from "react";
import SidebarChart from "./SidebarChart";

type Props = {
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

      <SidebarChart arrests={null} laws={null} />

      <div className="journeysButton flex justify-center m-20">
        <button
          aria-label="view journeys"
          className="Journeys bg-orange-500 text-center text-white font-sans py-2 px-4 rounded"
        >
          VIEW JOURNEYS
        </button>
      </div>
    </div>
  );
};
export default SidebarContainer;
