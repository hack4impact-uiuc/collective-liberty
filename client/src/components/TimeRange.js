// @flow

import React, { useState } from "react";
import { RangeSlider } from "reactrangeslider";
import "./../styles/TimeRange.css";

// tabbable, arrow keys to move sliders, aria labels min, max, and current value

const TimeRange = (props: Props) => {
  const { range, setRange, minTime, maxTime, step } = props;

  const onChange = (updatedRange) => {
    setRange({ start: updatedRange.start, end: updatedRange.end });
  };

  const mapTimeToValue = (timeValue) => {
    return timeValue;
  };

  return (
    <div className="rangeSlider">
      <h1>Time</h1>
      <RangeSlider
        value={range}
        onChange={onChange}
        min={minTime}
        max={maxTime}
        step={step}
        trackStyle={{ backgroundColor: "#F07533" }}
        // disabledTrackStyle={{backgroundColor: "#F07533"}}
        highlightedTrackStyle={{ backgroundColor: "#F07533" }}
        disabledHighlightedTrackStyle
        handleStyle={{ backgroundColor: "#F07533" }}
        focusedHandleStyle={{ backgroundColor: "#F07533" }}
        hoveredHandleStyle={{ backgroundColor: "#F07533" }}
        activeHandleStyle={{ backgroundColor: "#F07533" }}
        disabledHandleStyle={{ backgroundColor: "#F07533" }}
        wrapperStyle={{ width: "97%", marginLeft: "auto", marginRight: "auto" }}
      />
      <ul className="ticks">
        {Array.from(Array(maxTime - minTime + 1).keys()).map((x) => {
          return <li className="tick"> | </li>;
        })}
      </ul>
      <ul className="ticks">
        {Array.from(Array(maxTime - minTime + 1).keys()).map((x) => {
          return <li className="tick"> {x % 2 === 0 ? minTime + x : null} </li>;
        })}
      </ul>
    </div>
  );
};

export default TimeRange;
