// @flow

import React from "react";

import useWindowDimensions from "../../../utils/mobile";

type LegendColorsProps = {
  colors: string[],
};

const Colors = ({ colors }: LegendColorsProps) => {
  const [, isMobile] = useWindowDimensions();

  return (
    <>
      {colors.map((color) => (
        <span
          style={{
            backgroundColor: color,
            width: isMobile ? 30 : 50,
            display: "inline-block",
          }}
        >
          &nbsp;
        </span>
      ))}
    </>
  );
};

export default Colors;
