import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExamplePage from "./pages/ExamplePage";
import Map from "./components/Map";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ExamplePage} />
            <Route exact path="/map" component={Map} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
