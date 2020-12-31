// @flow

import React from "react";
import { useState } from "react";
import DeckGL from "@deck.gl/react";
import StateBoundaries from "./StateBoundaries.jsx";
import CityBoundaries from "./CityBoundaries";
import { tab } from "./SidebarContainer";
import {
  NavigationControl,
  WebMercatorViewport,
  StaticMap,
} from "react-map-gl";

import {CRIMINAL_LAWS_TAB} from "../utils/constants";

import { searchLocation } from "../utils/geocoding";

import "./../styles/Map.css";
import LawsKeyModal from "../components/LawsKeyModal";
import legendImg from "../imgs/legend.png";

const LAT_BOUNDS = [25, 49];
const LONG_BOUNDS = [-124, -68];
const DEFAULT_ZOOM = 3.5;
const DEFAULT_COORDS = [37.0902, -95.7129];

type Props = {
  incidents: Array<Object>,
  setLocationInfo: () => void,
};

const Map = (props: Props) => {
  const { incidents, setLocationInfo } = props;
  const [viewport, setViewport] = useState({
    width: "75%",
    height: "80vh",
    latitude: DEFAULT_COORDS[0],
    longitude: DEFAULT_COORDS[1],
    zoom: DEFAULT_ZOOM,
  });

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showStateBoundaryLayer, setShowStateBoundaryLayer] = useState(true);
  const [showCityBoundaryLayer, setShowCityBoundaryLayer] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

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
      <DeckGL
        layers={[
          StateBoundaries(incidents, showStateBoundaryLayer, setLocationInfo),
          CityBoundaries(incidents, showCityBoundaryLayer, setLocationInfo),
        ]}
        viewState={viewport}
        controller={true}
        style={{
          width: "75%",
          height: "80vh",
          left: "25%",
          top: "100",
        }}
        onViewStateChange={(nextViewState) => {
          const nextViewport = nextViewState.viewState;
          if (tab === CRIMINAL_LAWS_TAB) {
            setShowStateBoundaryLayer(false);
            setShowCityBoundaryLayer(false);
          }
          if (nextViewport.zoom < DEFAULT_ZOOM) {
            nextViewport.zoom = DEFAULT_ZOOM;
            nextViewport.latitude = DEFAULT_COORDS[0];
            nextViewport.longitude = DEFAULT_COORDS[1];
          } else if (nextViewport.zoom >= 7 && !showCityBoundaryLayer) {
            setShowStateBoundaryLayer(false);
            setShowCityBoundaryLayer(true);
          } else if (nextViewport.zoom < 7 && !showStateBoundaryLayer) {
            setShowStateBoundaryLayer(true);
            setShowCityBoundaryLayer(false);
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
      >
        <StaticMap
          style={{ style: "streets" }}
          // {...viewport}
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
        </StaticMap>
      </DeckGL>

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
            <img src={legendImg} alt="Individual Arrests 0 to 30+" />
            <div
              className="learnMore"
              onClick={() => {
                setModalVisible(true);
              }}
            >
              Learn more about these ratings
            </div>
          </div>
        </details>
        <LawsKeyModal
          modalVisible={modalVisible}
          closeModal={() => {
            setModalVisible(false);
          }}
        />
      </div>
    </>
  );
};

export default Map;
