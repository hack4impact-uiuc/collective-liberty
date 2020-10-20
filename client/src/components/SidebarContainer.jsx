import React from "react";

const SidebarContainer = () => {
  return (
    <div className="bg-black text-white p-6 shadow-md h-screen w-3/12">
      <h2>Title</h2> 
      <label for="period">year:</label>
      <select className="period" id="period">
      
      </select>
      <div className="graph">
      </div>

      <button className="bg-orange-500 text-white font-sans py-2 px-4 rounded">
          VIEW JOURNEYS
      </button>
    </div>
  );
};

export default SidebarContainer;
