import React from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";
import * as Constants from "../Constants";

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 700,
    latitude: Constants.defaultCoords[0],
    longitude: Constants.defaultCoords[1],
    zoom: Constants.defaultZoom,
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => {
        if (nextViewport.zoom < Constants.defaultZoom) {
          nextViewport.zoom = Constants.defaultZoom;
          nextViewport.latitude = Constants.defaultCoords[0];
          nextViewport.longitude = Constants.defaultCoords[1];
        }

        if (nextViewport.latitude > Constants.latBounds[1]) {
          nextViewport.latitude = Constants.latBounds[1];
        }

        if (nextViewport.latitude < Constants.latBounds[0]) {
          nextViewport.latitude = Constants.latBounds[0];
        }

        if (nextViewport.longitude > Constants.longBounds[1]) {
          nextViewport.longitude = Constants.longBounds[1];
        }

        if (nextViewport.longitude < Constants.longBounds[0]) {
          nextViewport.longitude = Constants.longBounds[0];
        }

        setViewport(nextViewport);
      }}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
    />
  );
};

export default Map;
