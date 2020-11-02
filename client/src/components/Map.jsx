import React from "react";
import { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { reverseGeocode } from "../utils/mapQuestApi";
import { getBoundsOfPlace } from "../utils/nominatimApi";

const LAT_BOUNDS = [25, 49];
const LONG_BOUNDS = [-124, -68];
const DEFAULT_ZOOM = 3.5;
const DEFAULT_COORDS = [37.0902, -95.7129];
const CITY_ZOOM_THRESHOLD = 5;

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "66%",
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
