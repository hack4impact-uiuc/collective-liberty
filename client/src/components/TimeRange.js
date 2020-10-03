// @flow

import React, { useState } from "react";
import { RangeSlider } from "reactrangeslider";
import "./../styles/TimeRange.css";

const TimeRange = (props: Props) => {
  const { range, setRange } = props;

  const onChange = (newStart, newEnd) => {
    setRange({ start: newStart, end: newEnd });
  };

  return (
    <div>
      <RangeSlider
        value={range}
        onChange={onChange}
        min={20}
        max={100}
        step={5}
      />
    </div>
  );
};

export default TimeRange;
