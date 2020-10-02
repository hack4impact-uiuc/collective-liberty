import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExamplePage from "./pages/ExamplePage";
import Map from "./components/Map";

function App() {
  return (
    <div className="App">
      <Router>
        <>
          <Switch>
            <Route path="/">
              <ExamplePage />
            </Route>
            <Route path="/map">
              <Map />
            </Route>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
