import React from "react";
import { Line } from "react-chartjs-2";

const SidebarContainer = () => {
  return (
    <div className="flex flex-col bg-black p-6 shadow-md h-screen w-3/12 container">
      <h2 className="Title text-white">Name Of Location</h2>
      <div className="flex flex-row text-grey">
        <select
          aria-label="beginning year of time range"
          className="text-gray-700 text-center inline-block px-4 py-2 m-0"
          id="start"
        >
          <option aria-label="2000">2000</option>
        </select>
        <h1 className="text-gray-700 text-center inline-block py-2 m-2">to</h1>
        <select
          aria-label="ending year of time range"
          className="text-gray-700 text-center inline-block px-4 py-2 m-0"
          id="end"
        >
          <option aria-label="2020">2020</option>
        </select>
      </div>
      <div className="graph m-20"></div>
      <div className="graph m-20">
        <Line />
      </div>

      <div className="journeysButton flex justify-center bottom-0 pt-40 m-20">
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
