import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";

import "../styles/SidebarGraph.css";

const FAKE_DATA = {
  labels: [...Array(10).keys()].map((x) => x + 2011),
  datasets: [
    {
      label: "Arrests",
      fill: false,
      lineTension: 0,
      backgroundColor: "#F07533",
      borderColor: "#F07533",
      borderWidth: 2,
      pointStyle: "line",
      data: [5, 9, 5, 19, 27, 28, 26, 39, 41, 43],
    },
  ],
};

const FAKE_LAWS = [
  {
    title: "X Policy passed allowing Y to Z",
    desc:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    year: 2013,
  },
  {
    title: "Law 1 expanded to protect 2",
    desc:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    year: 2017,
  },
];

// var lineOverlay = Chart.controllers.line.prototype.draw;
// Chart.helpers.extend(Chart.controllers.line.prototype, {
//   draw: function() {
//     lineOverlay.apply(this, arguments);

//     var chart = this.chart;
//     var width = chart.chart.width,
//         height = chart.chart.height,
//         ctx = chart.chart.ctx;

//     var fontSize = (height / 114).toFixed(2);
//     ctx.font = fontSize + "em sans-serif";
//     ctx.fillStyle = "black";
//     ctx.textBaseline = "middle";

//     var text = chart.config.data.text,
//         textX = Math.round((width - ctx.measureText(text).width) / 2),
//         textY = height / 2;

//     ctx.fillText(text, textX, textY);
//   }
// });

const SidebarContainer = ({ arrests, laws }) => {
  if (!laws) laws = FAKE_LAWS;
  if (!arrests) arrests = FAKE_DATA;

  const annotations = laws.map((law) => ({
    // drawTime: "afterDatasetsDraw",
    // id: "hline",
    type: "line",
    mode: "vertical",
    scaleID: "x-axis-0",
    value: law.year,
    borderColor: "#0a95ab",
    borderWidth: 3,
    borderDash: [9, 9],
    label: {
      backgroundColor: "#0a95ab",
      content: law.year.toString(),
      enabled: true,
      cornerRadius: 2,
      yAdjust: -70,
    },
  }));

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
      <div className="graph mt-3">
        <Line
          height={null}
          width={null}
          data={arrests}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.275,
            title: {
              display: true,
              text: "How Law Correlates with Arrests",
              fontSize: 16,
              fontColor: "white",
            },
            legend: {
              display: false,
            },
            annotation: {
              annotations: annotations,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    // Hide odd values
                    callback: (value, index, _) =>
                      index % 2 === 0 ? value : null,
                    rotation: 0,
                    fontSize: 12,
                    fontColor: "white",
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Year",
                    fontSize: 14,
                  },
                  gridLines: {
                    color: "#2E3232",
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    rotation: 0,
                    fontSize: 12,
                    fontColor: "white",
                    stepSize: 10,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Arrests",
                    fontSize: 14,
                  },
                  gridLines: {
                    color: "#2E3232",
                  },
                },
              ],
            },
          }}
        />
      </div>
      <ul className="flex flex-col mt-3 list-none p-0">
        {laws.map(({ title, desc, year }) => (
          <li className="flex law-entry text-white mr-5 pb-2">
            <div className="mr-5 relative">
              <time
                dateTime={year}
                className="p-1 rounded-sm bg-blue font-medium text-white"
              >
                {year}
              </time>
            </div>
            <div className="relative">
              <h5 className="font-bold mb-1 text-sm">{title}</h5>
              <p className="txt-gray text-sm leading-5">{desc}</p>
            </div>
          </li>
        ))}
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
