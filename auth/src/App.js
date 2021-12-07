import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

// Want to use memory history rather than browser history as the container will be the orchestrator of the browser navigation.
// Using Router as u can simply provider history object to it to keep consistency
export default ({ history, onSignIn }) => {
  return (
    <div>
      <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
          <Switch>
            <Route
              path="/auth/signin"
              render={() => <Signin onSignIn={onSignIn} />}
            />
            <Route
              path="/auth/signup"
              render={() => <Signup onSignIn={onSignIn} />}
            />
          </Switch>
        </StylesProvider>
      </Router>
    </div>
  );
};
