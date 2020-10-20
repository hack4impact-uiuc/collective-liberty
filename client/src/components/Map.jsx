import React from "react";
import { useState } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";

import "./../styles/Map.css";

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
    >
      <div
        className="searchBar"
        style={{ position: "absolute", left: 20, top: 20 }}
      >
        <input
          class="focus:outline-none focus:shadow-outline pl-2 mr-0.75 rounded-sm h-10"
          type="search"
          placeholder="Search for a location..."
          aria-label="Search for a location"
        ></input>
        <button class="bg-white rounded-sm p-2 focus:outline-none h-10">
          icon
        </button>
      </div>
      <div
        className="legend"
        style={{ position: "absolute", right: 40, top: 20 }}
      >
        <details>
          <summary>icon Legend</summary>
          <div>Individual Arrests</div>
        </details>
      </div>
      <div
        className="navigationControl"
        style={{ position: "absolute", right: 30, bottom: 50 }}
      >
        <NavigationControl />
      </div>
    </ReactMapGL>
  );
};

export default Map;
