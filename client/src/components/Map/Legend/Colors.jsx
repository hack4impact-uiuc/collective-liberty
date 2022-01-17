// @flow

import React from "react";

import useWindowDimensions from "../../../utils/mobile";

type LegendColorsProps = {
  colors: string[],
};

const Colors = ({ colors }: LegendColorsProps) => {
  const [, isMobile] = useWindowDimensions();

  return (
    <div className="legend-colors">
      {colors.map((color) => (
        <span
          style={{
            backgroundColor: color,
            width: '100%', 
            display: "inline-block",
          }}
        >
          &nbsp;
        </span>
      ))}
    </div>
  );
};

export default Colors;
