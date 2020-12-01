import { GeoJsonLayer } from "@deck.gl/layers";
import { MVTLayer } from "@deck.gl/geo-layers";
import { getIncidents } from "../utils/api";
import STATE_FIPS_CODES from "../utils/stateFIPSCodes";

const CityBoundaries = (incidents, visible, setLocationInfo) => {
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
    // getFillColor: (d) => determineColor(d.properties.NAME, counts, totCount),
    opacity: 0.3,
    getFillColor: (d) => [120, 120, 120],
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

export default CityBoundaries;
