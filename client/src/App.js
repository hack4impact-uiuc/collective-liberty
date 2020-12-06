import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/colors.css";

import NavBar from "./components/NavBar";
import MapPage from "./pages/MapPage";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App" role="main">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={MapPage} />
          <Route exact path="/uploadData" component={UploadPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
