import React from "react";

const SidebarContainer = () => {
  return (
    <div className="flex flex-col bg-black p-6 shadow-md h-screen w-3/12">
      <h2 className="Title text-white">Name Of Location</h2>
      <div clasName="flex flex-row text-grey">
        <select
          className="text-gray-700 text-center inline-block px-4 py-2 m-0"
          id="start"
        ></select>
        <h1 className="text-gray-700 text-center inline-block py-2 m-2">to</h1>
        <select
          className="text-gray-700 text-center inline-block px-4 py-2 m-0"
          id="end"
        ></select>
      </div>
      <div className="graph m-20"></div>

      <div className="journeysButton absolute inset-x-0 bottom-0 m-20 ">
        <button className="Journeys bg-orange-500 text-center text-white font-sans  py-2 px-4 rounded">
          VIEW JOURNEYS
        </button>
      </div>
    </div>
  );
};

export default SidebarContainer;
