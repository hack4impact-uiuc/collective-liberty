import data from "../state_boundaries.json";
import { GeoJsonLayer } from "@deck.gl/layers";

const StateBoundaries = () => {
  //const features = data.features.slice(0, 1)

  const layer = new GeoJsonLayer({
    id: "polygon-layer",
    data,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getFillColor: [200, 0, 0],
    getLineColor: [90, 80, 80],
    getLineWidth: 1,
  });

  return layer;
};

export default StateBoundaries;
