// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

export const hexDictToRGB = (dict) =>
  Object.entries(dict).reduce(
    (acc, [key, hex]) => (acc[key] = hexToRgb(hex)),
    {}
  );
