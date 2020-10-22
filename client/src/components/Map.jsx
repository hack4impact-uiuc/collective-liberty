import React from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";

const LAT_BOUNDS = [25, 49];
const LONG_BOUNDS = [-124, -68];
const DEFAULT_ZOOM = 3.5;
const DEFAULT_COORDS = [37.0902, -95.7129];

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "66%",
    height: "80vh",
    latitude: DEFAULT_COORDS[0],
    longitude: DEFAULT_COORDS[1],
    zoom: DEFAULT_ZOOM,
  });

  return (
    <ReactMapGL
      style={{ position: "absolute", right: 0, style: "streets" }}
      {...viewport}
      onViewportChange={(nextViewport) => {
        if (nextViewport.zoom < DEFAULT_ZOOM) {
          nextViewport.zoom = DEFAULT_ZOOM;
          nextViewport.latitude = DEFAULT_COORDS[0];
          nextViewport.longitude = DEFAULT_COORDS[1];
        }

        if (nextViewport.latitude > LAT_BOUNDS[1]) {
          nextViewport.latitude = LAT_BOUNDS[1];
        }

        if (nextViewport.latitude < LAT_BOUNDS[0]) {
          nextViewport.latitude = LAT_BOUNDS[0];
        }

        if (nextViewport.longitude > LONG_BOUNDS[1]) {
          nextViewport.longitude = LONG_BOUNDS[1];
        }

        if (nextViewport.longitude < LONG_BOUNDS[0]) {
          nextViewport.longitude = LONG_BOUNDS[0];
        }

        setViewport(nextViewport);
      }}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      dragRotate={false}
      touchRotate={false}
    />
  );
};

export default Map;
