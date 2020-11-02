import React from "react";
import { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { reverseGeocode } from "../utils/mapQuestApi";
import { getBoundsOfPlace } from "../utils/nominatimApi";
import ReactMapGL, {
  NavigationControl,
  WebMercatorViewport,
} from "react-map-gl";

import { searchLocation } from "../utils/geocoding";

import "./../styles/Map.css";

const LAT_BOUNDS = [25, 49];
const LONG_BOUNDS = [-124, -68];
const DEFAULT_ZOOM = 3.5;
const DEFAULT_COORDS = [37.0902, -95.7129];
const CITY_ZOOM_THRESHOLD = 5;

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "75%",
    height: "80vh",
    latitude: DEFAULT_COORDS[0],
    longitude: DEFAULT_COORDS[1],
    zoom: DEFAULT_ZOOM,
  });

  useEffect(() => {
    async function fetchGeocode(lat, long) {
      const geocodeResponse = await reverseGeocode(lat, long);

      if (geocodeResponse) {
        const cityBounds = sessionStorage.getItem(geocodeResponse);

        if (cityBounds) {
          const cityBoundsObj = JSON.parse(cityBounds);
          console.log(
            geocodeResponse + " from cache (geocode request NOT prevented):"
          );
          console.log(cityBoundsObj);

          sessionStorage.setItem("currentCity", geocodeResponse);
          sessionStorage.setItem("latLower", cityBoundsObj[0]);
          sessionStorage.setItem("latUpper", cityBoundsObj[1]);
          sessionStorage.setItem("longLower", cityBoundsObj[2]);
          sessionStorage.setItem("longUpper", cityBoundsObj[3]);
        } else {
          console.log("bounds response for " + geocodeResponse);
          const boundsResponse = await getBoundsOfPlace(geocodeResponse);

          if (boundsResponse) {
            console.log(geocodeResponse + " added to cache:");
            console.log(boundsResponse);

            sessionStorage.setItem(
              geocodeResponse,
              JSON.stringify(boundsResponse)
            );

            sessionStorage.setItem("currentCity", geocodeResponse);
            sessionStorage.setItem("latLower", boundsResponse[0]);
            sessionStorage.setItem("latUpper", boundsResponse[1]);
            sessionStorage.setItem("longLower", boundsResponse[2]);
            sessionStorage.setItem("longUpper", boundsResponse[3]);
          } else {
            console.log("boundsResponse error");
          }
        }
      } else {
        console.log("geocodeResponse error");
      }
    }

    async function fetchData() {
      const currentCity = sessionStorage.getItem("currentCity");

      const lat = viewport.latitude;
      const long = viewport.longitude;

      if (currentCity) {
        const latLower = sessionStorage.getItem("latLower");
        const latUpper = sessionStorage.getItem("latUpper");
        const longLower = sessionStorage.getItem("longLower");
        const longUpper = sessionStorage.getItem("longUpper");

        if (
          lat >= latLower &&
          lat <= latUpper &&
          long >= longLower &&
          long <= longUpper
        ) {
          console.log(currentCity + " from cache (geocode request prevented):");
          console.log(JSON.parse(sessionStorage.getItem(currentCity)));
        } else {
          fetchGeocode(lat, long);
        }
      } else {
        fetchGeocode(lat, long);
      }
    }

    if (viewport.zoom >= CITY_ZOOM_THRESHOLD) {
      fetchData();
    }
  }, [viewport]);
  const [searchValue, setSearchValue] = useState("");
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
    } else {
      const { longitude, latitude, zoom } = new WebMercatorViewport(
        viewport
      ).fitBounds([
        [bbox[2], bbox[1]],
        [bbox[0], bbox[3]],
      ]);
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
    } else {
      setSearchResults([]);
    }
  };

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
  };

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
        className="searchBar h-10 flex"
        role="search"
        style={{
          position: "absolute",
          left: "27%",
          top: 110,
          verticalAlign: "top",
        }}
        onSubmit={handleSubmit}
      >
        <input
          class="focus:outline-none focus:shadow-outline pl-2 mr-0.75 rounded-sm h-full border-t-2 border-b-2 border-l-2 w-64"
          type="search"
          list="suggestions"
          onChange={onChange}
          placeholder="Search for a location..."
          aria-label="Search Text"
        />
        {searchResults ? (
          <datalist id="suggestions">
            {searchResults.map((sugg) => (
              <option value={sugg.place_name} />
            ))}
          </datalist>
        ) : null}
        <button
          className="relative bg-white rounded-sm p-2 focus:outline-none focus:shadow-outline h-full border-t-2 border-b-2 border-r-2"
          type="submit"
          aria-label="Submit"
        >
          <box-icon
            name="search"
            style={{ height: "1.25em" }}
            color="#252727"
          />
        </button>
      </form>
      <div
        className="legend bg-white p-1 rounded-sm"
        style={{ position: "absolute", right: 40, top: 100 }}
      >
        <details>
          <summary className="p-1 flex justify-end">
            <box-icon name="info-circle" style={{ paddingRight: "4px" }} />
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
