import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start up the app
// Ele - Ref dom element to mount the app to
// onNavigate - callback function to let parent apps know of nav events
// defaultHistory - for when app is running in dev mode or isolation to use browser router rather than the memory router which is used when running within container
// initialPath - Memory router history ALWAYS starts with an initial path of `/` (Regardless whats currently in path - which browser router will check for on init).
// So when creating the memory history we can provide an initial path to override the default of `/` -> avoid blank render when /auth doesnt correspond to a component to mount.

const mount = (ele, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  //Default history provided? (running app in dev / isolation) otherwise use provided history from container
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  onNavigate && history.listen(onNavigate);
  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, ele);

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
  const devRoot = document.querySelector("#_auth-dev-root");
  devRoot && mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// We are running through the container
// and we should export the mount function
export { mount };
