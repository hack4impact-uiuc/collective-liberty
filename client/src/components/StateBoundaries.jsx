import { GeoJsonLayer } from "@deck.gl/layers";
import { MVTLayer } from "@deck.gl/geo-layers";
import { getIncidents } from "../utils/api";
import {
  ARRESTS_TAB,
  MASSAGE_PARLOR_LAWS_TAB,
  VACATUR_LAWS_TAB,
  CRIMINAL_LAWS_TAB,
  CRIMINAL_LAWS_COLORS_RGB,
  VACATUR_LAWS_COLORS_RGB,
  MASSAGE_PARLOR_LAW_COLORS_RGB,
  NEUTRAL_MAP_COLOR,
} from "../utils/constants";

const StateBoundaries = (data, visible, setLocationInfo, tab) => {
  return new MVTLayer({
    id: "stateBoundaries",
    data: [
      `https://a.tiles.mapbox.com/v4/kenetec.bftnu7o0/{z}/{x}/{y}.vector.pbf?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
      `https://b.tiles.mapbox.com/v4/kenetec.bftnu7o0/{z}/{x}/{y}.vector.pbf?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
    ],
    visible: true,
    minZoom: 3.5,
    maxZoom: 19,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getFillColor: (d) => determineColor(d.properties.NAME, data, visible, tab),
    getLineColor: [90, 80, 80],
    getLineWidth: 1,
    onClick: (info, event) => {
      if (info.object) {
        setLocationInfo({ state: info.object.properties.NAME, city: null });
        return true;
      }
    },

    updateTriggers: {
      getFillColor: [data, visible],
    },
  });
};

const determineColor = (state, data, visible, tab) => {
  if (!visible) return [0, 0, 0, 0];

  switch (tab) {
    case ARRESTS_TAB:
      return displayArrestColors(state, data);
    case MASSAGE_PARLOR_LAWS_TAB:
      return displayMassageColors(state, data);
    case VACATUR_LAWS_TAB:
      return displayVacaturColors(state, data);
    case CRIMINAL_LAWS_TAB:
      return displayCriminalColors(state, data);
    default:
      return NEUTRAL_MAP_COLOR;
  }
};

const displayArrestColors = (state, data) => {
  if (!data) {
    return [211, 202, 197];
  }

  const count = data[state];
  const stateMax = data._stateMax;

  // colors for ascending percentiles
  if (count === undefined) return [211, 202, 197];
  if (count / stateMax <= 0.25) return [166, 168, 168];
  if (count / stateMax <= 0.5) return [120, 133, 137];
  if (count / stateMax <= 0.75) return [79, 102, 110];
  else return [30, 65, 78];
};

const displayMassageColors = (state, laws) => {
  for (let i = 0; i < laws.length; i++) {
    const law = laws[i];

    if (law.state === state) {
      return MASSAGE_PARLOR_LAW_COLORS_RGB[law.strengthOfLaw];
    }
  }

  return MASSAGE_PARLOR_LAW_COLORS_RGB.None;
};

const displayVacaturColors = (state, laws) => {
  for (let i = 0; i < laws.length; i++) {
    const law = laws[i];

    if (law.state === state) {
      return VACATUR_LAWS_COLORS_RGB[law.rank];
    }
  }

  return NEUTRAL_MAP_COLOR;
};

const displayCriminalColors = (state, law) => {
  // clear color
  return [0, 0, 0, 0];
};

export default StateBoundaries;
