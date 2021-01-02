// @flow

import React, { useEffect, useState } from "react";
import { Range } from "rc-slider";
import { ARRESTS_TAB } from "../utils/constants.js";

import "rc-slider/assets/index.css";
import "./../styles/TimeRange.css";

type Props = {
  range: [Int],
  setRange: ([Int]) => void,
  minTime: Int,
  maxTime: Int,
  step: Int,
  tab: Int,
};

const TimeRange = (props: Props) => {
  const { range, setRange, minTime, maxTime, step, tab } = props;

  const [marks, setMarks] = useState({});

  useEffect(() => {
    const newMarks = {};
    for (let i = minTime; i <= maxTime; i += step) {
      newMarks[i] = i.toString();
    }
    setMarks(newMarks);
  }, [maxTime, minTime, setMarks, step]);

  const onChange = (newRange) => {
    setRange(newRange);
  };

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
        onChange={tab === ARRESTS_TAB ? onChange : () => {}}
        handleStyle={[
          {
            backgroundColor: "#CCCCCC",
            border: `4px solid ${tab === ARRESTS_TAB ? "#F07533" : "#939393"}`,
          },
          {
            backgroundColor: "#CCCCCC",
            border: `4px solid ${tab === ARRESTS_TAB ? "#F07533" : "#939393"}`,
          },
        ]}
        trackStyle={[
          { backgroundColor: tab === ARRESTS_TAB ? "#F07533" : "#939393" },
        ]}
        activeDotStyle={{
          border: `2px solid ${tab === ARRESTS_TAB ? "#F07533" : "#939393"}`,
        }}
      />
    </div>
  );
};

export default TimeRange;
