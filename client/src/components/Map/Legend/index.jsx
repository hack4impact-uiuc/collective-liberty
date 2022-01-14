// @flow

import React, { useState } from "react";

import Colors from "./Colors";
import { CRIMINAL_LAWS_TAB } from "../../../utils/constants";

const arrestColors = ["#D3CAC5", "#A6A8A8", "#788589", "#4F666E", "#1E414E"];
const massageColors = [
  "#CF2A2A",
  "#EB5757",
  "#FA9158",
  "#FFCB21",
  "#6FCF97",
  "#257F4A",
];
const vacaturColors = [
  "#7C2323",
  "#CF2A2A",
  "#EB5757",
  "#FA9158",
  "#FFCB21",
  "#6FCF97",
  "#257F4A",
];
const criminalColors = [
  "#CF2A2A",
  "#EB5757",
  "#FA9158",
  "#FFCB21",
  "#6FCF97",
  "#257F4A",
];

type LegendProps = {
  tab: number,
  setMassageModalVisible: (value: boolean) => void,
  setVacaturModalVisible: (value: boolean) => void,
};

export default function ({
  tab,
  setMassageModalVisible,
  setVacaturModalVisible,
}: LegendProps) {
  const [legendVisible, setLegendVisible] = useState(false);

  const onLegendClick = (e) => {
    if (e.target.className !== "learnMore") {
      setLegendVisible(!legendVisible);
    }
  };

  return (
    <button
      onClick={onLegendClick}
      class="legendBtn"
      style={{
        visibility: tab === CRIMINAL_LAWS_TAB ? "hidden" : "visible",
        // right:
        //   legendVisible &&
        //   (props.tab === 0
        //     ? "2em"
        //     : props.tab === 1
        //     ? "2.5em"
        //     : props.tab === 2
        //     ? "4em"
        //     : ""),
      }}
    >
      {!legendVisible ? (
        <div class="flex">
          {!legendVisible && (
            <div class="inline-block mt-0.5 mr-1">
              <box-icon name="info-circle" />
            </div>
          )}
          <p class="inline-block">Legend</p>
        </div>
      ) : (
        <>
          {legendVisible && <div class="float-right flex">x</div>}
          {legendVisible && (
            <div class="clear-left">
              {tab === 0 && (
                <div class="mb-2">
                  <p class="mt-8">Cases Per 10000 People </p>
                  <div className="flex">
                    <p class="mr-2 inline-block">0</p>
                    <Colors colors={arrestColors} />
                    <p class="ml-2 inline-block">16</p>
                  </div>
                  <p className="dataNote">
                    (data displayed for the 200 most populous cities)
                  </p>
                </div>
              )}
              {tab === 1 && (
                <div class="mt-10 px-4">
                  <div class="flex">
                    <Colors colors={massageColors} />
                  </div>
                  <div class="mb-8">
                    <p class="float-left">None</p>
                    <p class="float-right">Strong</p>
                  </div>
                  <a
                    className="learnMore"
                    onClick={() => {
                      setMassageModalVisible(true);
                    }}
                  >
                    Learn more about these ratings
                  </a>
                </div>
              )}
              {tab === 2 && (
                <div class="mt-10 px-4">
                  <div class="flex">
                    <Colors colors={vacaturColors} />
                  </div>
                  <div class="mb-8">
                    <p class="float-left">Kansas</p>
                    <p class="float-right">Excellent</p>
                  </div>
                  <a
                    className="learnMore"
                    onClick={() => {
                      setVacaturModalVisible(true);
                    }}
                  >
                    Learn more about these ratings
                  </a>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </button>
  );
}
