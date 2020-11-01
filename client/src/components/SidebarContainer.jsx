//@flow
import React from "react";
import SidebarChart from "./SidebarChart";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import { useState } from "react";
import { getArrestData } from "../utils/api";




type Props = {
  city: String,
  state: String,
  time_range: [Int],
};


const SidebarContainer = (props: Props) => {
  const { city, state, time_range } = props;
  const [arrestData, setArrestData] = useState(null);
  useEffect(async () => {
    const data = await getArrestData({city: "",state: "illinois",time_range: [2000, 2020]})
    setArrestData(data)
  }, [city, state, time_range]);
  
  return (
    <div className="flex flex-col bg-black p-6 shadow-md h-screen w-3/12 container">
      <h2 className="Title text-white">Name of Location</h2>
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

      <div className="TraffickingStats flex flex-row m-10">
        <div className="TraffickingScore flex flex-row">
          
          <div className="TraffickingScore text-white">{arrestData && arrestData.arrestScore}</div> 
        </div>
        <div className="ArrestTypes flex flex-col">
          <h2 className="TraffickerArrests text-gray-700"> {arrestData && arrestData.traffickerArrestCount} Trafficker Arrests</h2>
          <hr size="5" width="90%" color="grey"></hr>
          <h2 className="VictimArrests text-gray-700">{arrestData && arrestData.victimArrestCount} Victim Arrests</h2>
        </div>
        <div className="Separation flex flex-row">|</div>

        <div className="TotalCases flex flex-col">
          <div className="totalCaseCount text-white">{arrestData && arrestData.totalCaseCount}</div> 
          <h2 className="totalCasesLabel text-gray-700">Total Cases</h2> 
        </div>

      </div>

      <SidebarChart arrests={null} laws={null} />

      <div className="journeysButton flex justify-center m-20">
        <button
          aria-label="view journeys"
          className="Journeys bg-orange-500 text-center text-white font-sans py-2 px-4 rounded">
          VIEW JOURNEYS
        </button>
      </div>
    </div>
  );
};
export default SidebarContainer;
