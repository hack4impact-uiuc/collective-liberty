import React, { useEffect, useState } from "react";
import SidebarChart from "./SidebarChart";

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
    <div
      className="flex flex-col bg-black p-6 shadow-md h-full w-3/12 container"
      style={{ minHeight: "calc(100vh - 84px" }}
    >
      <h1 className="text-3xl font-extrabold text-white">Name of Location</h1>
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

      <SidebarChart arrests={null} laws={null} />
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
