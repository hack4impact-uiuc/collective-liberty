// @flow

import React, { useState } from "react";

import Colors from "./Colors";
import { CRIMINAL_LAWS_TAB } from "../../../utils/constants";

import "./Legend.scss";

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
      className="legendBtn"
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
        <div className="closedInner">
          {!legendVisible && <box-icon name="info-circle" />}
          <p>Legend</p>
        </div>
      ) : (
        <span className="openInner">
          <div className="title">
            <p>Legend</p>
            <box-icon name="x" />
          </div>
          <div>
            {tab === 0 && (
              <div>
                <p>Cases Per 10000 People </p>
                <div className="color-wrapper">
                  <p>0</p>
                  <Colors colors={arrestColors} />
                  <p>16</p>
                </div>
                <p className="dataNote">
                  (data displayed for the 200 most populous cities)
                </p>
              </div>
            )}
            {tab === 1 && (
              <div>
                <div className="color-wrapper">
                  <p>None</p>
                  <Colors colors={massageColors} />
                  <p>Strong</p>
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
              <div>
                <div className="color-wrapper">
                  <p>Kansas*</p>
                  <Colors colors={vacaturColors} />
                  <p>Excellent</p>
                </div>
                <a
                  className="learnMore"
                  onClick={() => {
                    setVacaturModalVisible(true);
                  }}
                >
                  *Learn more about these ratings
                </a>
              </div>
            )}
          </div>
        </span>
      )}
    </button>
  );
}
