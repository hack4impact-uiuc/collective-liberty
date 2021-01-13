// @flow

import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";

import "../styles/SidebarChart.css";

const FAKE_DATA = {
  labels: [...Array(10).keys()].map((x) => x + 2011),
  datasets: [
    {
      label: "Arrests",
      fill: false,
      lineTension: 0,
      backgroundColor: "#F07533",
      borderColor: "#F07533",
      borderWidth: 3,
      pointRadius: 0,
      hitRadius: 7,
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

type Props = {
  laws: Array<Object>,
  arrests: Array<Object>,
  title: String,
  arrestsDataLabel: String,
  range: Array<Number>,
};

const SidebarChart = ({
  title,
  laws,
  arrests,
  arrestsDataLabel,
  range,
}: Props) => {
  if (!laws) laws = FAKE_LAWS;
  if (!arrests) arrests = FAKE_DATA;

  const lawAnnotations = laws.map((law) => ({
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
    <>
      <div className="graph mt-3">
        <Line
          height={null}
          width={null}
          data={{
            labels: [...Array(range[1] - range[0] + 1).keys()].map(
              (year) => year + range[0]
            ),
            datasets: [
              {
                label: arrestsDataLabel,
                fill: false,
                lineTension: 0,
                backgroundColor: "#F07533",
                borderColor: "#F07533",
                borderWidth: 3,
                pointRadius: 0,
                hitRadius: 7,
                data: arrests,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.275,
            title: {
              display: true,
              text: title,
              fontSize: 16,
              fontColor: "white",
            },
            legend: {
              display: false,
            },
            annotation: {
              annotations: lawAnnotations,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    // Hide odd values
                    callback: (value, index, _) =>
                      index % 2 === 0 ? value : null,
                    rotation: 0,
                    fontSize: 13,
                    fontColor: "white",
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Time",
                    fontSize: 15,
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
                    fontSize: 13,
                    fontColor: "white",
                    stepSize: 10,
                    // beginAtZero: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: arrestsDataLabel,
                    fontSize: 15,
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
          <li
            className="flex law-entry text-white mr-5 pb-2"
            role="region"
            key={title + year}
          >
            <div className="mr-5 relative">
              <time
                dateTime={year}
                className="p-1 rounded-sm block bg-blue font-medium text-white"
              >
                {year}
              </time>
            </div>
            <div className="relative">
              <h5 className="font-bold mb-1 text-md">{title}</h5>
              <p className="txt-gray text-md leading-5">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarChart;
