import React from "react";
import { Line } from "react-chartjs-2";

import '../styles/SidebarGraph.css';

const FAKE_DATA = {
  labels: [...Array(10).keys()].map(x => x + 2011),
  datasets: [
    {
      label: "Arrests",
      fill: false,
      lineTension: 0,
      backgroundColor: '#F07533',
      borderColor: '#F07533',
      borderWidth: 2,
      pointStyle: 'line',
      data: [5, 9, 5, 19, 27, 28, 26, 39, 41, 43],
    }
  ]
}

const FAKE_LAWS = [
  {
    title: "X Policy passed allowing Y to Z",
    desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    year: 2012
  },
  {
    title: "Law 1 expanded to protect 2",
    desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    year: 2016
  }
] 

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
      <div className="graph">
        <Line
          height={null} width={null}
          data={FAKE_DATA}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.275,
            title:{
              display: true,
              text: 'How Law Correlates with Arrests',
              fontSize: 16,
            },
            legend:{
              display: false,
            },
            scales: {
              xAxes: [{
                  ticks: {
                      // Hide odd values
                      callback: (value, index, _) => index % 2 === 0 ? value : "",
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Year"
                  },
              }],
              yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: "Arrests"
                  },
              }]
          }
          }}
        />
      </div>
      <ul className="flex flex-col law-list">
          {
            FAKE_LAWS.map(({title, desc, year}) => (
              <li className="flex law-item">
                <div className="mr-5">
                  <time dateTime={year} className="p-1 rounded-sm bg-black text-white">
                    {year}
                  </time>
                </div>
                <div>
                  <h5>{title}</h5>
                  <p>{desc}</p>
                </div>
              </li>
            ))
          }
      </ul>

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
