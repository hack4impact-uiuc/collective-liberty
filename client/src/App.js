import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/TimeRange";

import "./App.css";

function App() {
  return (
    <div className="App">
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
