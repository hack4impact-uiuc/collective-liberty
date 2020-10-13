import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/TimeRange";

import "./App.css";
import TimeRange from "./components/TimeRange";

function App() {
  const [range, setRange] = useState([2006, 2008]);

  return (
    <div className="App">
      <TimeRange
        range={range}
        setRange={setRange}
        minTime={2000}
        maxTime={2020}
        step={1}
      />
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
