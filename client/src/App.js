import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/colors.css";

import NavBar from "./components/NavBar";
import MapPage from "./pages/MapPage";
import AboutUsPage from "./pages/AboutUsPage";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RoleApprovalPage from "./pages/RoleApprovalPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App" role="main">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={MapPage} />
          <Route exact path="/about" component={AboutUsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <PrivateRoute exact path="/uploadData" component={UploadPage} />
          <PrivateRoute
            exact
            path="/roleApproval"
            component={RoleApprovalPage}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
