// @flow

import React from "react";
import { useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import StateBoundaries from "./StateBoundaries.jsx";
import CityBoundaries from "./CityBoundaries";
import {
  NavigationControl,
  WebMercatorViewport,
  StaticMap,
} from "react-map-gl";

import { searchLocation } from "../utils/geocoding";

import "./../styles/Map.css";
import MassageLawsKeyModal from "./MassageLawsKeyModal.jsx";
import VacaturLawsKeyModal from "./VacaturLawsKeyModal.jsx";

const LAT_BOUNDS = [25, 49];
const LONG_BOUNDS = [-124, -68];
const DEFAULT_ZOOM = 3.5;
const DEFAULT_COORDS = [37.0902, -95.7129];

const arrestColors = ["#D3CAC5", "#A6A8A8", "#788589", "#4F666E", "#1E414E"];
const massageColors = [
  "#CF2A2A",
  "#EB5757",
  "#FA9158",
  "#FFCB21",
  "#6FCF97",
  "#257F4A",
];
const vacaturColors = [
  "#7C2323",
  "#CF2A2A",
  "#EB5757",
  "#FA9158",
  "#FFCB21",
  "#6FCF97",
  "#257F4A",
];
const criminalColors = [
  "#CF2A2A",
  "#EB5757",
  "#FA9158",
  "#FFCB21",
  "#6FCF97",
  "#257F4A",
];

type Props = {
  incidents: Array<Object>,
  setLocationInfo: () => void,
  tab: Int,
  layerData: Array<Object>,
};

type LegendProps = {
  colors: String[],
};

const LegendColors = (props: LegendProps) => {
  return (
    <>
      {props.colors.map((c) => (
        <span
          style={{ backgroundColor: c, width: 50, display: "inline-block" }}
        >
          &nbsp;
        </span>
      ))}
    </>
  );
};

const Map = (props: Props) => {
  const { incidents, setLocationInfo, tab, layerData } = props;
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

  const [criminalModalVisible, setCriminalModalVisible] = useState(false);
  const [massageModalVisible, setMassageModalVisible] = useState(false);
  const [vacaturModalVisible, setVacaturModalVisible] = useState(false);

  const [legendVisible, setLegendVisible] = useState(false);

  const checkZoom = (nextViewport) => {
    if (nextViewport.zoom < DEFAULT_ZOOM) {
      nextViewport.zoom = DEFAULT_ZOOM;
      nextViewport.latitude = DEFAULT_COORDS[0];
      nextViewport.longitude = DEFAULT_COORDS[1];
    }

    if (nextViewport.zoom >= 7 && !showCityBoundaryLayer) {
      setShowStateBoundaryLayer(false);
      setShowCityBoundaryLayer(true);
    } else if (nextViewport.zoom < 7 && !showStateBoundaryLayer) {
      setShowStateBoundaryLayer(true);
      setShowCityBoundaryLayer(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newViewPort = JSON.parse(JSON.stringify(viewport));
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
      setSearchResults(results.features);
    } else {
      setSearchResults([]);
    }
  };

  const onLegendClick = (e) => {
    if (e.target.className !== "learnMore") {
      setLegendVisible(!legendVisible);
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

    checkZoom(nextViewport);
    setViewport(nextViewport);
  };

  return (
    <>
      <DeckGL
        layers={[
          StateBoundaries(
            layerData,
            showStateBoundaryLayer,
            setLocationInfo,
            tab
          ),
          CityBoundaries(
            incidents,
            showCityBoundaryLayer,
            setLocationInfo,
            tab
          ),
        ]}
        viewState={viewport}
        controller={true}
        style={{
          width: "75%",
          height: "78vh",
          left: "25%",
          top: "100",
        }}
        onViewStateChange={(nextViewState) => {
          const nextViewport = nextViewState.viewState;

          checkZoom(nextViewport);

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
          style={{ style: "streets", width: "100%", height: "100%" }}
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
        className="searchBar h-10 flex focus-child"
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
          class="focus:outline-none pl-2 mr-0.75 rounded-tl-sm rounded-bl-sm h-full border-t-2 border-b-2 border-l-2 w-64"
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
          className="relative bg-white rounded-tr-sm rounded-br-sm p-2 focus:outline-none h-full border-t-2 border-b-2 border-r-2"
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
      <button
        onClick={onLegendClick}
        class="bg-white py-2 px-4 rounded-sm font-medium"
        style={{ position: "absolute", right: 40, top: 100 }}
      >
        <div class="float-left flex">
          {!legendVisible && (
            <div class="inline-block mt-0.5 mr-1">
              <box-icon name="info-circle" />
            </div>
          )}
          <p class="inline-block">Legend</p>
        </div>
        {legendVisible && <div class="float-right flex">x</div>}
        {legendVisible && (
          <div class="clear-left">
            {props.tab === 0 && (
              <div class="mb-2">
                <p class="mt-8">Cases Per 10000 People </p>
                <p class="mr-2 inline-block">0</p>
                <LegendColors colors={arrestColors} />
                <p class="ml-2 inline-block">16</p>
                <p className="learnMore">Data displayed for the 200 most populous cities</p>
              </div>
            )}
            {props.tab === 1 && (
              <div class="mt-10 px-4">
                <LegendColors colors={massageColors} />
                <div class="mb-8">
                  <p class="float-left">None</p>
                  <p class="float-right">Strong</p>
                </div>
                <a
                  className="learnMore"
                  onClick={() => {
                    setMassageModalVisible(true);
                  }}
                >
                  Learn more about these ratings
                </a>
              </div>
            )}
            {props.tab === 2 && (
              <div class="mt-10 px-4">
                <LegendColors colors={vacaturColors} />
                <div class="mb-8">
                  <p class="float-left">Kansas</p>
                  <p class="float-right">Excellent</p>
                </div>
                <a
                  className="learnMore"
                  onClick={() => {
                    setVacaturModalVisible(true);
                  }}
                >
                  Learn more about these ratings
                </a>
              </div>
            )}
            {props.tab === 3 && (
              <div class="mt-10 px-4">
                <LegendColors colors={criminalColors} />
                <div class="mb-8">
                  <p class="float-left">Very Bad</p>
                  <p class="float-right">Strong</p>
                </div>
                {/* <a
                  className="learnMore"
                  onClick={() => {
                    setCriminalModalVisible(true);
                  }}
                >
                  Learn more about these ratings
                </a> */}
              </div>
            )}
          </div>
        )}
      </button>
      <MassageLawsKeyModal
        modalVisible={massageModalVisible}
        closeModal={() => {
          setMassageModalVisible(false);
        }}
      />
      <VacaturLawsKeyModal
        modalVisible={vacaturModalVisible}
        closeModal={() => {
          setVacaturModalVisible(false);
        }}
      />
      {/* <LawsKeyModal
          modalVisible={criminalModalVisible}
          closeModal={() => {
            setCriminalModalVisible(false);
          }}
        /> */}
    </>
  );
};

export default Map;
