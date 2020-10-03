import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/TimeRange";

import "./App.css";
import TimeRange from "./components/TimeRange";

function App() {
  const [range, setRange] = useState({ start: 50, end: 80 });

  return (
    <div className="App">
      <TimeRange range={range} setRange={setRange} />
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
