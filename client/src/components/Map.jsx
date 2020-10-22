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
          class="focus:outline-none focus:shadow-outline pl-2 mr-0.75 rounded-sm h-10 border-2 w-64"
          type="search"
          placeholder="Search for a location..."
          aria-label="Search for a location"
        />
        <button
          class="bg-white rounded-sm p-2 focus:outline-none focus:shadow-outline h-10 leading-tight border-t-2 border-b-2 border-r-2"
          type="submit"
          aria-label="Submit Search"
        >
          icon
        </button>
      </div>
      <div
        className="legend"
        class="bg-white p-1 rounded-sm"
        style={{ position: "absolute", right: 40, top: 20 }}
      >
        <details>
          <summary class="p-2">
            <img
              class="w-5 h-5 inline mr-1 mb-1"
              src="information.png"
              alt="i"
            />
            Legend
          </summary>
          <div class="w-64">
            <img src="legend.png" alt="legend" />
          </div>
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
