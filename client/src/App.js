import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/colors.css";

import NavBar from "./components/NavBar";
import MapPage from "./pages/MapPage";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <div className="App" role="main">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={MapPage} />
          <Route exact path="/uploadData" component={UploadPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
