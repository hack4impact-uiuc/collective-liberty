import React, { useState, useEffect, useCallback } from "react";

const fakeVacatur = {
  state: "Illinois",
  anyTypeCivilRemedy: true,
  offersVacatur: "Juvenile Only",
  offersClemency: "No",
  OffersExpungement: "Yes",
  rank: "Needs Improvement",
};

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
};

const VacaturSidebar = (props: Props) => {
  // const { vacatur } = props;
  const vacatur = fakeVacatur;

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
  }, [vacatur.anyTypeCivilRemedy, vacatur.expungementColors, vacatur.offersClemency, vacatur.offersVacatur]);

  return (
    <>
      <h3 class="txt-gray mt-6">Vacatur Rating</h3>
      <div class="flex">
        <div class="inline-block mt-1">
          <box-icon
            type="solid"
            name="circle"
            color={rankColorMap[vacatur.rank]}
          />
        </div>
        <h3 class="text-white inline-block ml-2 mt-1">
          {vacatur.rank} <a class="txt-blue">(Learn about other ratings)</a>
        </h3>
      </div>
      <p class="txt-gray text-sm mb-4">
        The law has minimal clauses to regulate businesses - usually just zoning
        restrictions or requirements to obtain a business license
      </p>
      <button
        onClick={onCivilClick}
        class="rounded bg-eclipse text-white mt-4 py-2 px-4 overflow-y-auto w-full"
        aria-label={civilVisible ? "shrink description" : "expand description"}
      >
        <p class="float-left">Civil Remedy</p>
        <div class="float-right flex">
          <p class="inline-block mr-2 txt-silver">Learn More</p>
          <div class="inline-block mt-0.5">
            {civilVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div class="flex w-full my-2">
          <div
            class={
              civilColors[0] +
              " w-1/2 inline-block px-2 py-1 text-center rounded "
            }
          >
            Unavailable
          </div>
          <div
            class={
              civilColors[1] +
              " w-1/2 inline-block px-2 py-1 text-center rounded "
            }
          >
            Available
          </div>
        </div>
        {civilVisible && (
          <p class="break-normal text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        )}
      </button>
      <button
        onClick={onVacaturClick}
        class="rounded bg-eclipse text-white mt-4 py-2 px-4 overflow-y-auto w-full"
        aria-label={
          vacaturVisible ? "shrink description" : "expand description"
        }
      >
        <p class="float-left">Vacatur</p>
        <div class="float-right flex">
          <p class="inline-block mr-2 txt-silver">Learn More</p>
          <div class="inline-block mt-0.5">
            {vacaturVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div class="flex w-full my-2">
          <div
            class={
              vacaturColors[0] +
              " w-1/3 inline-block px-2 py-1 text-center rounded "
            }
          >
            Unavailable
          </div>
          <div
            class={
              vacaturColors[1] +
              " w-1/3 inline-block px-2 py-1 text-center rounded "
            }
          >
            Juvenile Only
          </div>
          <div
            class={
              vacaturColors[2] +
              " w-1/3 inline-block px-2 py-1 text-center rounded "
            }
          >
            Available
          </div>
        </div>
        {vacaturVisible && (
          <p class="break-normal text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        )}
      </button>
      <button
        onClick={onClemencyClick}
        class="rounded bg-eclipse text-white mt-4 py-2 px-4 overflow-y-auto w-full"
        aria-label={
          clemencyVisible ? "shrink description" : "expand description"
        }
      >
        <p class="float-left">Clemency</p>
        <div class="float-right flex">
          <p class="inline-block mr-2 txt-silver">Learn More</p>
          <div class="inline-block mt-0.5">
            {clemencyVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div class="flex w-full my-2">
          <div
            class={
              clemencyColors[0] +
              " w-1/3 inline-block px-2 py-1 text-center rounded "
            }
          >
            Unavailable
          </div>
          <div
            class={
              clemencyColors[1] +
              " w-1/3 inline-block px-2 py-1 text-center rounded "
            }
          >
            Juvenile Only
          </div>
          <div
            class={
              clemencyColors[2] +
              " w-1/3 inline-block px-2 py-1 text-center rounded "
            }
          >
            Available
          </div>
        </div>
        {clemencyVisible && (
          <p class="break-normal text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        )}
      </button>
      <button
        onClick={onExpungementClick}
        class="rounded bg-eclipse text-white mt-4 py-2 px-4 overflow-y-auto w-full"
        aria-label={
          expungementVisible ? "shrink description" : "expand description"
        }
      >
        <p class="float-left">Expungement</p>
        <div class="float-right flex">
          <p class="inline-block mr-2 txt-silver">Learn More</p>
          <div class="inline-block mt-0.5">
            {expungementVisible ? (
              <box-icon name="minus-circle" color="#C4C4C4"></box-icon>
            ) : (
              <box-icon name="plus-circle" color="#C4C4C4"></box-icon>
            )}
          </div>
        </div>
        <div class="flex w-full my-2">
          <div
            class={
              expungementColors[0] +
              " w-1/3 inline-block px-2 py-1 text-center rounded "
            }
          >
            Unavailable
          </div>
          <div
            class={
              expungementColors[1] +
              " w-1/3 inline-block px-2 py-1 text-center rounded "
            }
          >
            Juvenile Only
          </div>
          <div
            class={
              expungementColors[2] +
              " w-1/3 inline-block px-2 py-1 text-center rounded "
            }
          >
            Available
          </div>
        </div>
        {expungementVisible && (
          <p class="break-normal text-left">
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
