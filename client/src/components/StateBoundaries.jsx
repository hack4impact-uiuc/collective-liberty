import data from "../state_boundaries.json";
import { GeoJsonLayer } from "@deck.gl/layers";
import { MVTLayer } from "@deck.gl/geo-layers";
import { getIncidents } from "../utils/api";

const StateBoundaries = (incidents, setLocationInfo) => {
  //const counts = makeStateIncidentCounts(incidents);
  //onst totCount = getNumIncidents(incidents);
  const counts = incidents;
  const totCount = incidents._totalIncidents;
  console.log(counts);
  console.log(totCount);

  const layer = new GeoJsonLayer({
    data,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getFillColor: (d) => determineColor(d.properties.NAME, counts, totCount),
    getLineColor: [90, 80, 80],
    getLineWidth: 1,
    onClick: (info, event) => {
      console.log("click: ", info);
      if (info.object) {
        setLocationInfo({ state: info.object.properties.NAME, city: null });
        return true;
      }
    },

    updateTriggers: {
      getFillColor: [counts, totCount],
    },
  });
  // const layer = new MVTLayer({
  //   data: [
  //     `https://a.tiles.mapbox.com/v4/kenetec.bftnu7o0/{z}/{x}/{y}.vector.pbf?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
  //     `https://b.tiles.mapbox.com/v4/kenetec.bftnu7o0/{z}/{x}/{y}.vector.pbf?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
  //   ],
  //   minZoom: 3.5,
  //   maxZoom: 19,
  //   pickable: true,
  //   stroked: true,
  //   filled: true,
  //   wireframe: true,
  //   lineWidthMinPixels: 1,
  //   getFillColor: (d) => determineColor(d.properties.NAME, counts, totCount),
  //   getLineColor: [90, 80, 80],
  //   getLineWidth: 1,
  //   onClick: (info, event) => {
  //     console.log(info)
  //     setLocationInfo({state: info.object.properties.NAME, city: null})
  //   }
  // })

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
  const stateIncidentCounts = {};

  for (var i = 0; i < incidents.length; i++) {
    if (stateIncidentCounts[incidents[i].state] === undefined)
      stateIncidentCounts[incidents[i].state] = 1;
    else
      stateIncidentCounts[incidents[i].state] =
        stateIncidentCounts[incidents[i].state] + 1;
  }
  return stateIncidentCounts;
};

const getNumIncidents = (incidents) => {
  return incidents.length;
};

export default StateBoundaries;
