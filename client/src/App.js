import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <div className="App" role="main">
      <link
        href="http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext"
        rel="stylesheet"
        type="text/css"
      ></link>
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
