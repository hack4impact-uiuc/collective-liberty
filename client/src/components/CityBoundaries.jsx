import { GeoJsonLayer } from "@deck.gl/layers";
import { MVTLayer } from "@deck.gl/geo-layers";
import { getIncidents } from "../utils/api";

const CityBoundaries = (incidents, setLocationInfo) => {
  const counts = incidents;
  const totCount = incidents._totalIncidents;
  const layer = new MVTLayer({
    data: [
      `https://a.tiles.mapbox.com/v4/kenetec.9jq7asti/{z}/{x}/{y}.vector.pbf?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
      `https://b.tiles.mapbox.com/v4/kenetec.9jq7asti/{z}/{x}/{y}.vector.pbf?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
    ],
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    // getFillColor: (d) => determineColor(d.properties.NAME, counts, totCount),
    opacity: 0.3,
    getFillColor: (d) => [120, 120, 120],
    getLineColor: [90, 80, 80],
    getLineWidth: 1,
    onClick: (info, event) => {
      console.log("click: ", info);
      if (info.object) {
        // setLocationInfo({state: info.object.properties.NAME, city: null})
      }
    },
  });

  return layer;
};

const determineColor = (state, counts, totCount) => {
  let count = counts[state];

  // colors for ascending percentiles
  if (count === undefined) return [211, 202, 197];

  if (count / totCount <= 0.2) return [166, 168, 168];

  if (count / totCount <= 0.4) return [120, 133, 137];

  if (count / totCount <= 0.6) return [79, 102, 110];
  else return [30, 65, 78];
};

const makeStateIncidentCounts = (incidents) => {
  const incidentCounts = {};

  for (var i = 0; i < incidents.length; i++) {
    if (incidentCounts[incidents[i].state] === undefined)
      incidentCounts[incidents[i].state] = 1;
    else
      incidentCounts[incidents[i].state] =
        incidentCounts[incidents[i].state] + 1;
  }
  return incidentCounts;
};

const getNumIncidents = (incidents) => {
  return incidents.length;
};

export default CityBoundaries;
