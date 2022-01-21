// @flow

import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import DeckGL from "@deck.gl/react";
import { MapboxLayer } from "@deck.gl/mapbox";
import StateBoundaries from "../StateBoundaries.jsx";
import CityBoundaries from "../CityBoundaries";
import {
  NavigationControl,
  WebMercatorViewport,
  StaticMap,
  _MapContext as MapContext,
} from "react-map-gl";

import Legend from "./Legend";

import { searchLocation } from "../../utils/geocoding";

import "./Map.scss";

import MassageLawsKeyModal from "../modals/MassageLawsKeyModal.jsx";
import VacaturLawsKeyModal from "../modals/VacaturLawsKeyModal.jsx";
import useWindowDimensions from "../../utils/mobile";

const LAT_BOUNDS = [25, 49];
const LONG_BOUNDS = [-124, -68];
const DEFAULT_ZOOM = 3.5;
const DEFAULT_COORDS = [37.0902, -95.7129];

type Props = {
  incidents: Array<Object>,
  setLocationInfo: () => void,
  tab: number,
  layerData: Array<Object>,
  vacaturModalVisible: boolean,
  setVacaturModalVisible: (value: boolean) => void,
  sidebarCollapsed: boolean,
};

const Map = ({
  incidents,
  setLocationInfo,
  tab,
  layerData,
  vacaturModalVisible,
  setVacaturModalVisible,
  sidebarCollapsed,
}: Props) => {
  const [, isMobile] = useWindowDimensions();

  const [glContext, setGLContext] = useState();
  const deckRef = useRef(null);
  const mapRef = useRef(null);

  const [viewport, setViewport] = useState({
    width: isMobile ? window.innerWidth : window.innerWidth * 0.75,
    height: isMobile ? window.innerHeight * 0.75 : window.innerHeight * 0.8,
    latitude: DEFAULT_COORDS[0],
    longitude: DEFAULT_COORDS[1],
    zoom: DEFAULT_ZOOM,
    bearing: 0,
    pitch: 0,
  });

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showStateBoundaryLayer, setShowStateBoundaryLayer] = useState(true);
  const [showCityBoundaryLayer, setShowCityBoundaryLayer] = useState(false);

  const [criminalModalVisible, setCriminalModalVisible] = useState(false);
  const [massageModalVisible, setMassageModalVisible] = useState(false);

  const shouldShowMapForm = () => sidebarCollapsed || !isMobile;

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

  const onMapLoad = useCallback(() => {
    // const map = mapRef.current.getMap();
    // const deck = deckRef.current.deck;
    // // const layers = [
    // //     StateBoundaries(
    // //       layerData,
    // //       showStateBoundaryLayer,
    // //       setLocationInfo,
    // //       tab
    // //     ),
    // //     CityBoundaries(
    // //       incidents,
    // //       showCityBoundaryLayer,
    // //       setLocationInfo,
    // //       tab
    // //     ),
    // //   ]
    // //   deck.setProps({layers})
    // const mapLayers = map.getStyle().layers;
    // // Find the index of the first symbol layer in the map style
    // const firstSymbolId = mapLayers.find((layer) => layer.type === "symbol")
    //   ?.id;
    // // console.log("first symbol id", firstSymbolId);
    // mapLayers.forEach((layer) => console.log("layer:", layer.id, layer.type));
    // map.addLayer(
    //   // new MapboxLayer({ id: "stateBoundaries", deck }, "state-label-lg")
    //   new MapboxLayer({ id: "stateBoundaries", deck }, firstSymbolId)
    // );
    // map.addLayer(
    //   new MapboxLayer({ id: "cityBoundaries", deck }, firstSymbolId)
    // );
    // console.log("map", map);
    // console.log("deck", deck);
  }, []);

  return (
    <>
      <div className="deck-gl-map">
        <DeckGL
          ref={deckRef}
          ContextProvider={MapContext.Provider}
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
            width: isMobile ? "100%" : "75%",
            height: isMobile ? "calc(100% - 4em - 12vh)" : "78vh",
            left: !isMobile && "25%",
            top: isMobile ? "4em" : "calc(5rem + 4px)",
          }}
          glOptions={{
            stencil: true,
          }}
          // onWebGLInitialized={setGLContext}
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
          {/* {glContext && ( */}
          <StaticMap
            ref={mapRef}
            // gl={glContext}
            onLoad={onMapLoad}
            style={{ style: "streets", width: "100%", height: "100%" }}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            dragRotate={false}
            touchRotate={false}
          ></StaticMap>
          {/* )} */}
          <div
            className="navigationControl"
            style={{ position: "absolute", right: 30, bottom: 50, zIndex: 1 }}
          >
            <NavigationControl
              showCompass={false}
              onViewportChange={(nextViewport) =>
                checkSetViewport(nextViewport)
              }
            />
          </div>
          {/* <div
          id="attribution"
          className="mapboxgl-ctrl mapboxgl-ctrl-attrib mapboxgl-ctrl-bottom-right"
          style={{ }}
        >
          <a href="*">Attribution 1</a> &nbsp;|&nbsp;
          <a href="*">Attribution 2</a> &nbsp;|&nbsp;
          <a href="*">Attribution n</a> &nbsp;|
        </div> */}
        </DeckGL>
      </div>

      {shouldShowMapForm() && (
        <div className="mapTopBar">
          <form className="searchBar" role="search" onSubmit={handleSubmit}>
            <input
              className="searchBarInput"
              type="search"
              list="suggestions"
              onChange={onChange}
              placeholder={isMobile ? "Search..." : "Search for a location..."}
              aria-label="Search Text"
            />
            {searchResults ? (
              <datalist id="suggestions">
                {searchResults.map((suggestion) => (
                  <option value={suggestion.place_name} />
                ))}
              </datalist>
            ) : null}
            <button type="submit" aria-label="Submit">
              <box-icon
                name="search"
                style={{ height: "1.25em" }}
                color="#252727"
              />
            </button>
          </form>
          <Legend
            tab={tab}
            setMassageModalVisible={setMassageModalVisible}
            setVacaturModalVisible={setVacaturModalVisible}
          />
        </div>
      )}
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
