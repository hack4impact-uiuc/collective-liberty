import React from "react";
//import data from "../state_boundaries.json";
import DeckGL from "@deck.gl/react";
import { PolygonLayer } from "@deck.gl/layers";

function StateBoundaries({ data, viewState }) {
  const layer = new PolygonLayer({
    id: "polygon-layer",
    data,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getPolygon: (d) => d.contour,
    getFillColor: (d) => [160, 160, 160],
    getLineColor: [90, 80, 80],
    getLineWidth: 1,
  });

  return <DeckGL viewState={viewState} layers={[layer]} />;
}

export default StateBoundaries;
