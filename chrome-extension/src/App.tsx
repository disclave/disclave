import * as React from "react";
import { MemoryRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, homeHref } from "./pages/Home";
import { Login, loginHref } from "./pages/Login";
import { Register, registerHref } from "./pages/Register";
import { SessionProvider } from "@disclave/client";

export const App = () => {
  return (
    <SessionProvider
      serverSideUid={null}
      manageAuthCookie={false}
      isIframe={false}
    >
      <Router>
        <div className="m-4 w-96">
          <Switch>
            <Route path={loginHref}>
              <Login />
            </Route>
            <Route path={registerHref}>
              <Register />
            </Route>
            <Route path={homeHref}>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </SessionProvider>
  );
};
