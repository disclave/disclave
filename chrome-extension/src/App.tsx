import * as React from "react";
import { MemoryRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, homeHref } from "./pages/Home";
import { Login, loginHref } from "./pages/Login";

export const App = () => {
  return (
    <Router>
      <div className="m-4 w-80">
        <Switch>
          <Route path={loginHref}>
            <Login />
          </Route>
          <Route path={homeHref}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
