import React from "react";
import ExampleComponent from "../components/ExampleComponent";
import NavBar from "../components/NavBar";

const ExamplePage = () => {
  return (
    <>
      <NavBar />
      <ExampleComponent />
      <ExampleComponent />
    </>
  );
};

export default ExamplePage;
