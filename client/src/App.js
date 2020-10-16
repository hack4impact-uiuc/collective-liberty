import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <div className="App" role="main">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={MapPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
