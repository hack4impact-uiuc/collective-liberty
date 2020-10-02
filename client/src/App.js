import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/TimeRange";

import "./App.css";
import TimeRange from "./components/TimeRange";

function App() {
  return (
    <div className="App">
      <TimeRange/>
      <Router>
        <>
          <Switch>
            <Route path="/"></Route>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
