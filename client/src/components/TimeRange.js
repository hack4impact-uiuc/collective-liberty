// @flow

import React, { useEffect, useState } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import "./../styles/TimeRange.css";

const TimeRange = (props: Props) => {
  const { range, setRange, minTime, maxTime, step } = props;

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
    <div className="rangeSlider">
      <Range
        className="range"
        min={minTime}
        max={maxTime}
        marks={marks}
        step={step}
        range={true}
        allowCross={false}
        value={range}
        onChange={onChange}
        handleStyle={[
          { backgroundColor: "#CCCCCC", border: "4px solid #F07533" },
          { backgroundColor: "#CCCCCC", border: "4px solid #F07533" },
        ]}
        trackStyle={[{ backgroundColor: "#F07533" }]}
        activeDotStyle={{ border: "2px solid #F07533" }}
      />
    </div>
  );
};

export default TimeRange;
