import { GeoJsonLayer } from "@deck.gl/layers";
import { MVTLayer } from "@deck.gl/geo-layers";
import { getIncidents } from "../utils/api";

const StateBoundaries = (incidents, visible, setLocationInfo) => {
  const counts = incidents;

  return new MVTLayer({
    id: "stateBoundaries",
    data: [
      `https://a.tiles.mapbox.com/v4/kenetec.bftnu7o0/{z}/{x}/{y}.vector.pbf?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
      `https://b.tiles.mapbox.com/v4/kenetec.bftnu7o0/{z}/{x}/{y}.vector.pbf?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
    ],
    visible,
    minZoom: 3.5,
    maxZoom: 19,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getFillColor: (d) => determineColor(d.properties.NAME, counts),
    getLineColor: [90, 80, 80],
    getLineWidth: 1,
    onClick: (info, event) => {
      if (info.object) {
        setLocationInfo({ state: info.object.properties.NAME, city: null });
        return true;
      }
    },

    updateTriggers: {
      getFillColor: [counts],
    },
  });
};

const determineColor = (state, counts) => {
  if (!counts) {
    return [211, 202, 197];
  }

  const count = counts[state];
  const stateMax = counts._stateMax;

  // colors for ascending percentiles
  if (count === undefined) return [211, 202, 197];
  if (count / stateMax <= 0.25) return [166, 168, 168];
  if (count / stateMax <= 0.5) return [120, 133, 137];
  if (count / stateMax <= 0.75) return [79, 102, 110];
  else return [30, 65, 78];
};

export default StateBoundaries;
