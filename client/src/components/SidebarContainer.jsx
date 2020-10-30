import React from "react";
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

  return (
    <div className="flex flex-col bg-black p-6 shadow-md h-screen w-3/12 container">
      <h2 className="Title text-white">Name of Location</h2>
      <div className="flex flex-row text-grey">
        <select
          aria-label="beginning year of time range"
          className="text-gray-700 text-center inline-block px-4 py-2 m-0"
          id="start"
        >
          <option aria-label="{range[0]}">{range[0]}</option>
          <option aria-label="{minTime}">{minTime}</option>
        </select>
        <h1 className="text-gray-700 text-center inline-block py-2 m-2">to</h1>
        <select
          aria-label="ending year of time range"
          className="text-gray-700 text-center inline-block px-4 py-2 m-0"
          id="end"
        >
          <option aria-label="{range[1]}">{range[1]}</option>
          <option aria-label="{maxTime}">{maxTime}</option>
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
