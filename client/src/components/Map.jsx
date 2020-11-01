import React from "react";
import { useState } from "react";
import ReactMapGL, { NavigationControl, WebMercatorViewport } from "react-map-gl";

import { searchLocation } from "../utils/geocoding";

import "./../styles/Map.css";

const LAT_BOUNDS = [25, 49];
const LONG_BOUNDS = [-124, -68];
const DEFAULT_ZOOM = 3.5;
const DEFAULT_COORDS = [37.0902, -95.7129];

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "75%",
    height: "80vh",
    latitude: DEFAULT_COORDS[0],
    longitude: DEFAULT_COORDS[1],
    zoom: DEFAULT_ZOOM
  });

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newViewPort = JSON.parse(JSON.stringify(viewport));
    console.log(e);
    const results = await searchLocation(searchValue);
    if (!results.features) {
      return;
    }
    const bbox = results.features[0].bbox;
    if (!bbox) {
      newViewPort.latitude = results.features[0].center[1];
      newViewPort.longitude = results.features[0].center[0];
    }
    else {
      const {longitude, latitude, zoom} = new WebMercatorViewport(viewport)
        .fitBounds([[bbox[2], bbox[1]], [bbox[0], bbox[3]]]);
      newViewPort.latitude = latitude;
      newViewPort.longitude = longitude;
      newViewPort.zoom = zoom;
    }
    checkSetViewport(newViewPort);
  };

  const onChange = async (e) => {
    setSearchValue(e.target.value);
    if (e.target.value && e.target.value.length >= 2) {
      const results = await searchLocation(e.target.value);
      console.log(results);
      setSearchResults(results.features);
    }
    else {
      setSearchResults([]);
    }
  }

  const checkSetViewport = (nextViewport) => {
    if (nextViewport.zoom < DEFAULT_ZOOM) {
      nextViewport.zoom = DEFAULT_ZOOM;
      nextViewport.latitude = DEFAULT_COORDS[0];
      nextViewport.longitude = DEFAULT_COORDS[1];
    }

    if (nextViewport.latitude > LAT_BOUNDS[1]) {
      nextViewport.latitude = DEFAULT_COORDS[0];
      nextViewport.zoom = DEFAULT_ZOOM;
    }

    if (nextViewport.latitude < LAT_BOUNDS[0]) {
      nextViewport.latitude = DEFAULT_COORDS[0];
      nextViewport.zoom = DEFAULT_ZOOM;
    }

    if (nextViewport.longitude > LONG_BOUNDS[1]) {
      nextViewport.longitude = DEFAULT_COORDS[1];
      nextViewport.zoom = DEFAULT_ZOOM;
    }

    if (nextViewport.longitude < LONG_BOUNDS[0]) {
      nextViewport.longitude = DEFAULT_COORDS[1];
      nextViewport.zoom = DEFAULT_ZOOM;
    }

    setViewport(nextViewport);
  }

  return (
    <>
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
      {/* <div
        className="categories"
        class="inline-flex text-sm"
        style={{ position: "absolute", left: 20, bottom: 30}}
      >
        <button class="bg-gray-700 text-white inline rounded-sm p-2 focus:outline-none focus:shadow-outline mx-1 w-20 h-20">
          Massage Parlor Laws
        </button>
        <button class="bg-teal-500 text-white inline rounded-sm p-2 focus:outline-none focus:shadow-outline mx-1 w-20 h-20">
          Arrest Data
        </button>
        <button class="bg-gray-700 text-white inline rounded-sm p-2 focus:outline-none focus:shadow-outline mx-1 w-20 h-20">
          Another Category
        </button>
      </div> */}
      <div
        className="navigationControl"
        style={{ position: "absolute", right: 30, bottom: 50 }}
      >
        <NavigationControl />
      </div>
    </ReactMapGL>
    <form
        className="searchBar"
        role="search"
        style={{ position: "absolute", left: "27%", top: 110 }}
        onSubmit={handleSubmit}
      >
        <input
          class="focus:outline-none focus:shadow-outline pl-2 mr-0.75 rounded-sm h-10 border-2 w-64"
          type="search"
          list="suggestions"
          onChange={onChange}
          placeholder="Search for a location..."
          aria-label="Submit"
        />
        {searchResults ? 
          <datalist id="suggestions">
            {searchResults.map(sugg => <option value={sugg.place_name}/>)}
          </datalist>
        : null}
        <button
          class="bg-white rounded-sm p-2 focus:outline-none focus:shadow-outline h-10 leading-tight border-t-2 border-b-2 border-r-2"
          type="submit"
          aria-label="Submit"
        >
          icon
        </button>
      </form>
    <div
    className="legend"
    class="bg-white p-1 rounded-sm"
    style={{ position: "absolute", right: 40, top: 100 }}
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
        <img src="legend.png" alt="Individual Arrests 0 to 30+" />
      </div>
    </details>
  </div>
  </>
  );
};

export default Map;
