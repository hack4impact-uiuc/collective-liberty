import React from "react";
import ExampleComponent from "../components/ExampleComponent";
import { getBoundsOfState } from "../utils/nominatimApi";
import { useEffect } from "react";

const ExamplePage = () => {
  useEffect(async () => {
    // Testing response of getBoundsOfState api function

    const response = await getBoundsOfState("Illinois");

    if (response) {
      console.log(response);
    } else {
      console.log("error");
    }
  });

  return (
    <>
      <ExampleComponent />
      <ExampleComponent />
    </>
  );
};

export default ExamplePage;
