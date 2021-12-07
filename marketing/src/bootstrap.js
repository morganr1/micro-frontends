import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (ele, { onNavigate, defaultHistory, initialPath }) => {
  //Default history provided? (running app in dev / isolation) otherwise use provided history from container
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  onNavigate && history.listen(onNavigate);
  ReactDOM.render(<App history={history} />, ele);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (nextPathname !== pathname) {
        history.push(nextPathname);
      }
    },
  };
};

// Check if we're in development mode and in isolation
// Call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  devRoot && mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// We are running through the container
// and we should export the mount function
export { mount };
