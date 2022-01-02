import React, { useState, useEffect } from "react";
import { VACATUR_RANK_EXPLANATIONS } from "../../utils/constants";
import "./VacaturSidebar.scss";

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
      <h3 className="title">Vacatur Rating</h3>
      <div className="info">
        <div>
          <box-icon
            type="solid"
            name="circle"
            color={rankColorMap[vacatur.rank] || "#939393"}
          />
        </div>
        <h3>
          {vacatur.rank || "N/A"}{" "}
          <a
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
        className="dropdown"
        aria-label={civilVisible ? "shrink description" : "expand description"}
      >
        <p className="name">Civil Remedy</p>
        <div className="learn-more">
          <p>Learn More</p>
          <div>
            {civilVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div className="data">
          <div className={civilColors[0]}>Unavailable</div>
          <div className={civilColors[1]}>Available</div>
        </div>
        {civilVisible && (
          <p className="reveal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        )}
      </button>
      <button
        onClick={onVacaturClick}
        className="dropdown"
        aria-label={
          vacaturVisible ? "shrink description" : "expand description"
        }
      >
        <p className="name">Vacatur</p>
        <div className="learn-more">
          <p>Learn More</p>
          <div>
            {vacaturVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div className="data">
          <div className={vacaturColors[0]}>Unavailable</div>
          <div className={vacaturColors[1]}>Juvenile Only</div>
          <div className={vacaturColors[2]}>Available</div>
        </div>
        {vacaturVisible && (
          <p className="reveal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        )}
      </button>
      <button
        onClick={onClemencyClick}
        className="dropdown"
        aria-label={
          clemencyVisible ? "shrink description" : "expand description"
        }
      >
        <p className="name">Clemency</p>
        <div className="learn-more">
          <p>Learn More</p>
          <div>
            {clemencyVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div className="data">
          <div className={clemencyColors[0]}>Unavailable</div>
          <div className={clemencyColors[1]}>Juvenile Only</div>
          <div className={clemencyColors[2]}>Available</div>
        </div>
        {clemencyVisible && (
          <p className="reveal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        )}
      </button>
      <button
        onClick={onExpungementClick}
        className="dropdown"
        aria-label={
          expungementVisible ? "shrink description" : "expand description"
        }
      >
        <p className="name">Expungement</p>
        <div className="learn-more">
          <p>Learn More</p>
          <div>
            {expungementVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div className="data">
          <div className={expungementColors[0]}>Unavailable</div>
          <div className={expungementColors[1]}>Juvenile Only</div>
          <div className={expungementColors[2]}>Available</div>
        </div>
        {expungementVisible && (
          <p className="reveal">
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
