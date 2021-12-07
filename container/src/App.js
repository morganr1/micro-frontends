import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};
