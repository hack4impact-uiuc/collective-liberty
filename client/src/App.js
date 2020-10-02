import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExamplePage from "./pages/ExamplePage";

function App() {
  return (
    <div className="App">
      <Router>
        <>
          <Switch>
            <Route path="/">
              <ExamplePage />
            </Route>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
