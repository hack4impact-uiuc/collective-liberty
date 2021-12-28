import { GeoJsonLayer } from "@deck.gl/layers";
import { MVTLayer } from "@deck.gl/geo-layers";
import STATE_FIPS_CODES from "../utils/stateFIPSCodes";
import { ARRESTS_TAB } from "../utils/constants";

const CityBoundaries = (incidents, visible, setLocationInfo, tab) => {
  return new MVTLayer({
    id: "cityBoundaries",
    data: [
      `https://a.tiles.mapbox.com/v4/kenetec.2txyqbbi/{z}/{x}/{y}.vector.pbf?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
      `https://b.tiles.mapbox.com/v4/kenetec.2txyqbbi/{z}/{x}/{y}.vector.pbf?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
    ],
    visible,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getFillColor: (d) =>
      determineColor(
        d.properties.NAME,
        STATE_FIPS_CODES[d.properties.STATEFP],
        incidents,
        tab
      ),
    opacity: 0.3,
    getLineColor: [90, 80, 80],
    getLineWidth: 1,
    onClick: (info, event) => {
      if (info.object) {
        const props = info.object.properties;
        setLocationInfo({
          state: STATE_FIPS_CODES[props.STATEFP],
          city: props.NAME,
        });
      }
    },
  });
};

const determineColor = (city, state, counts, tab) => {
  // clear color
  if (tab !== ARRESTS_TAB) return [0, 0, 0, 0];

  if (!counts) {
    return [211, 202, 197];
  }

  let count = counts[`${city},${state}`];
  let max = counts[state];

  // colors for ascending percentiles
  if (count === undefined || count === 0) return [211, 202, 197];
  if (count / 10000 <= 4) return [166, 168, 168];
  if (count / 10000 <= 8) return [120, 133, 137];
  if (count / 10000 <= 12) return [79, 102, 110];
  else return [30, 65, 78];
};

export default CityBoundaries;
