import React, { useState, lazy, Suspense, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { createBrowserHistory } from "history";

const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));
const DashboardApp = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

// Leveraging Router instead of browserRouter so this component has direct access to history.
const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Switch>
          <Suspense fallback={<Progress />}>
            <Route
              path="/auth"
              render={() => <AuthApp onSignIn={() => setIsSignedIn(true)} />}
            />
            <Route
              path="/pricing"
              render={() => (
                <MarketingApp onSignIn={() => setIsSignedIn(true)} />
              )}
            />

            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardApp />
            </Route>
            <Route
              exact
              path="/"
              render={() => (
                <MarketingApp onSignIn={() => setIsSignedIn(true)} />
              )}
            />
          </Suspense>
        </Switch>
      </StylesProvider>
    </Router>
  );
};
