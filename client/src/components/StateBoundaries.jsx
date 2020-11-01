import data from "../state_boundaries.json";
import { GeoJsonLayer } from "@deck.gl/layers";
import { getIncidents } from "../utils/api";

const StateBoundaries = async () => {
  const counts = await makeStateIncidentCounts();
  const totCount = await getNumIncidents();
  const structure = await makeStateIncidentCounts();
  const layer = new GeoJsonLayer({
    id: "polygon-layer",
    data,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getFillColor: (d) => determineColor(d.properties.NAME, counts, totCount),
    getLineColor: [90, 80, 80],
    getLineWidth: 1,
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

const makeStateIncidentCounts = async () => {
  const stateIncidentCounts = {};

  const incidents = await getIncidents();
  for (var i = 0; i < incidents.length; i++) {
    if (stateIncidentCounts[incidents[i].state] === undefined)
      stateIncidentCounts[incidents[i].state] = 1;
    else
      stateIncidentCounts[incidents[i].state] =
        stateIncidentCounts[incidents[i].state] + 1;
  }
  return stateIncidentCounts;
};

const getNumIncidents = async () => {
  const incidents = await getIncidents();
  return incidents.length;
};

export default StateBoundaries;
