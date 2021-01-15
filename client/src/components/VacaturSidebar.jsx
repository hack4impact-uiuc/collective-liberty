import React, { useState, useEffect, useCallback } from "react";
import { VACATUR_RANK_EXPLANATIONS } from "../utils/constants";

const rankColorMap = {
  Kansas: "#7C2323",
  "Very Bad": "#CF2A2A",
  Bad: "#EB5757",
  "Needs Improvement": "#FA9158",
  Fair: "#FFCB21",
  Good: "#6FCF97",
  Excellent: "#257F4A",
};

type Props = {
  vacatur: Object,
  setVacaturModalVisible: () => void,
};

const VacaturSidebar = (props: Props) => {
  const { vacatur, setVacaturModalVisible } = props;

  const [civilVisible, setCivilVisible] = useState(false);
  const [vacaturVisible, setVacaturVisible] = useState(false);
  const [clemencyVisible, setClemencyVisible] = useState(false);
  const [expungementVisible, setExpungementVisible] = useState(false);

  const [civilColors, setCivilColors] = useState([]);
  const [vacaturColors, setVacaturColors] = useState([]);
  const [clemencyColors, setClemencyColors] = useState([]);
  const [expungementColors, setExpungementColors] = useState([]);

  const onCivilClick = () => {
    setCivilVisible(!civilVisible);
  };
  const onVacaturClick = () => {
    setVacaturVisible(!vacaturVisible);
  };
  const onClemencyClick = () => {
    setClemencyVisible(!clemencyVisible);
  };
  const onExpungementClick = () => {
    setExpungementVisible(!expungementVisible);
  };

  const setThreeVacaturColors = (value, setter) => {
    if (value === "No") {
      setter([
        "bg-flamingo border-white border-2",
        "bg-black",
        "bg-gray-option",
      ]);
    } else if (value === "Juvenile Only") {
      setter(["bg-black", "bg-orange border-white border-2", "bg-gray-option"]);
    } else {
      setter([
        "bg-black",
        "bg-gray-option",
        "bg-offered border-white border-2",
      ]);
    }
  };

  useEffect(() => {
    if (vacatur.anyTypeCivilRemedy) {
      setCivilColors(["bg-black", "bg-offered border-white border-2"]);
    } else {
      setCivilColors(["bg-flamingo border-white border-2", "bg-black"]);
    }
    setThreeVacaturColors(vacatur.offersVacatur, setVacaturColors);
    setThreeVacaturColors(vacatur.offersClemency, setClemencyColors);
    setThreeVacaturColors(vacatur.expungementColors, setExpungementColors);
  }, [
    vacatur.anyTypeCivilRemedy,
    vacatur.expungementColors,
    vacatur.offersClemency,
    vacatur.offersVacatur,
  ]);

  return (
    <>
      <h3 className="txt-gray mt-6">Vacatur Rating</h3>
      <div className="flex">
        <div className="inline-block mt-1">
          <box-icon
            type="solid"
            name="circle"
            color={rankColorMap[vacatur.rank] || "#939393"}
          />
        </div>
        <h3 className="text-white inline-block ml-2 mt-1">
          {vacatur.rank || "N/A"}{" "}
          <a
            className="txt-blue cursor-pointer"
            onClick={() => {
              setVacaturModalVisible(true);
            }}
          >
            (Learn about other ratings)
          </a>
        </h3>
      </div>
      <p class="txt-gray text-sm mb-4">
        {VACATUR_RANK_EXPLANATIONS[vacatur.rank]}
      </p>
      <button
        onClick={onCivilClick}
        className="rounded bg-eclipse text-white mt-4 py-2 px-4 overflow-y-auto w-full"
        aria-label={civilVisible ? "shrink description" : "expand description"}
      >
        <p className="float-left">Civil Remedy</p>
        <div className="float-right flex">
          <p className="inline-block mr-2 txt-silver">Learn More</p>
          <div className="inline-block mt-0.5">
            {civilVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div className="flex w-full my-2">
          <div
            className={
              civilColors[0] +
              " w-1/2 inline-block px-2 py-1 text-center rounded-l"
            }
          >
            Unavailable
          </div>
          <div
            className={
              civilColors[1] +
              " w-1/2 inline-block px-2 py-1 text-center rounded-r"
            }
          >
            Available
          </div>
        </div>
        {civilVisible && (
          <p className="break-normal text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        )}
      </button>
      <button
        onClick={onVacaturClick}
        className="rounded bg-eclipse text-white mt-4 py-2 px-4 overflow-y-auto w-full"
        aria-label={
          vacaturVisible ? "shrink description" : "expand description"
        }
      >
        <p className="float-left">Vacatur</p>
        <div className="float-right flex">
          <p className="inline-block mr-2 txt-silver">Learn More</p>
          <div className="inline-block mt-0.5">
            {vacaturVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div className="flex w-full my-2">
          <div
            className={
              vacaturColors[0] +
              " w-1/3 inline-block px-2 py-1 text-center rounded-l"
            }
          >
            Unavailable
          </div>
          <div
            className={
              vacaturColors[1] + " w-1/3 inline-block px-2 py-1 text-center"
            }
          >
            Juvenile Only
          </div>
          <div
            className={
              vacaturColors[2] +
              " w-1/3 inline-block px-2 py-1 text-center rounded-r"
            }
          >
            Available
          </div>
        </div>
        {vacaturVisible && (
          <p className="break-normal text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        )}
      </button>
      <button
        onClick={onClemencyClick}
        className="rounded bg-eclipse text-white mt-4 py-2 px-4 overflow-y-auto w-full"
        aria-label={
          clemencyVisible ? "shrink description" : "expand description"
        }
      >
        <p className="float-left">Clemency</p>
        <div className="float-right flex">
          <p className="inline-block mr-2 txt-silver">Learn More</p>
          <div className="inline-block mt-0.5">
            {clemencyVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div className="flex w-full my-2">
          <div
            className={
              clemencyColors[0] +
              " w-1/3 inline-block px-2 py-1 text-center rounded-l"
            }
          >
            Unavailable
          </div>
          <div
            className={
              clemencyColors[1] + " w-1/3 inline-block px-2 py-1 text-center"
            }
          >
            Juvenile Only
          </div>
          <div
            className={
              clemencyColors[2] +
              " w-1/3 inline-block px-2 py-1 text-center rounded-r"
            }
          >
            Available
          </div>
        </div>
        {clemencyVisible && (
          <p className="break-normal text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        )}
      </button>
      <button
        onClick={onExpungementClick}
        className="rounded bg-eclipse text-white mt-4 py-2 px-4 overflow-y-auto w-full"
        aria-label={
          expungementVisible ? "shrink description" : "expand description"
        }
      >
        <p className="float-left">Expungement</p>
        <div className="float-right flex">
          <p className="inline-block mr-2 txt-silver">Learn More</p>
          <div className="inline-block mt-0.5">
            {expungementVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div className="flex w-full my-2 h-16">
          <div
            className={
              expungementColors[0] +
              " w-1/3 flex items-center justify-center text-center items-center rounded-l"
            }
          >
            Unavailable
          </div>
          <div
            className={
              expungementColors[1] +
              " w-1/3 flex items-center justify-center text-center"
            }
          >
            Juvenile Only
          </div>
          <div
            className={
              expungementColors[2] +
              " w-1/3 flex items-center justify-center text-center rounded-r"
            }
          >
            Available
          </div>
        </div>
        {expungementVisible && (
          <p className="break-normal text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        )}
      </button>
    </>
  );
};

export default VacaturSidebar;
