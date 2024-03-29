// @flow

import React, { useEffect, useState } from "react";
import { Range } from "rc-slider";
import { ARRESTS_TAB, MASSAGE_PARLOR_LAWS_TAB } from "../utils/constants.js";

import "rc-slider/assets/index.css";
import "./../styles/TimeRange.css";

type Props = {
  range: number[],
  setRange: (value: number[]) => void,
  minTime: number,
  maxTime: number,
  step: number,
  tab: number,
};

const TimeRange = ({ range, setRange, minTime, maxTime, step, tab }: Props) => {
  const [marks, setMarks] = useState({});

  useEffect(() => {
    const newMarks = {};
    for (let i = minTime; i <= maxTime; i += step) {
      newMarks[i] = i.toString();
    }
    setMarks(newMarks);
  }, [maxTime, minTime, setMarks, step]);

  return (
    <div
      className="rangeSlider"
      role="slider"
      aria-valuemax={maxTime}
      aria-valuemin={minTime}
      aria-valuenow={range}
    >
      <h1 className="headerText">Time Range</h1>
      <Range
        className="range"
        min={minTime}
        max={maxTime}
        marks={marks}
        step={step}
        range={true}
        allowCross={false}
        value={range}
        onChange={
          tab === ARRESTS_TAB || tab === MASSAGE_PARLOR_LAWS_TAB
            ? (newRange) => setRange(newRange)
            : () => {}
        }
        handleStyle={[
          {
            backgroundColor: "#CCCCCC",
            border: `4px solid ${
              tab === ARRESTS_TAB || tab === MASSAGE_PARLOR_LAWS_TAB
                ? "#F07533"
                : "#939393"
            }`,
          },
          {
            backgroundColor: "#CCCCCC",
            border: `4px solid ${
              tab === ARRESTS_TAB || tab === MASSAGE_PARLOR_LAWS_TAB
                ? "#F07533"
                : "#939393"
            }`,
          },
        ]}
        trackStyle={[
          {
            backgroundColor:
              tab === ARRESTS_TAB || tab === MASSAGE_PARLOR_LAWS_TAB
                ? "#F07533"
                : "#939393",
          },
        ]}
        activeDotStyle={{
          border: `2px solid ${
            tab === ARRESTS_TAB || tab === MASSAGE_PARLOR_LAWS_TAB
              ? "#F07533"
              : "#939393"
          }`,
        }}
      />
    </div>
  );
};

export default TimeRange;
