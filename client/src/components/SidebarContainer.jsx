import React from "react";
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

const SidebarContainer = () => {
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
          >
            <option aria-label="2000">2000</option>
            <option aria-label="2000">2000</option>
            <option aria-label="2000">2000</option>
            <option aria-label="2000">2000</option>
            <option aria-label="2000">2000</option>
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
          >
            <option aria-label="2020">2020</option>
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
