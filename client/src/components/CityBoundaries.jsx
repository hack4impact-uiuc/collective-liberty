import { GeoJsonLayer } from "@deck.gl/layers";
import { MVTLayer } from "@deck.gl/geo-layers";
import { getIncidents } from "../utils/api";
import STATE_FIPS_CODES from "../utils/stateFIPSCodes";

const CityBoundaries = (incidents, visible, setLocationInfo) => {
  const counts = incidents;

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
        counts
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

const determineColor = (city, state, counts) => {
  if (!counts) {
    return [211, 202, 197];
  }

  let count = counts[`${city}, ${state}`];
  let max = counts[state];

  // colors for ascending percentiles
  if (count === undefined) return [211, 202, 197];
  if (count / max <= 0.02) return [166, 168, 168];
  if (count / max <= 0.06) return [120, 133, 137];
  if (count / max <= 0.1) return [79, 102, 110];
  else return [30, 65, 78];
};

export default CityBoundaries;
