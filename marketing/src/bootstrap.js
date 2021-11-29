import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Mount function to start up the app
const mount = (ele) => {
  ReactDOM.render(<App />, ele);
};

// Check if we're in development mode and in isolation
// Call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  devRoot && mount(devRoot);
}

// We are running through the container
// and we should export the mount function
export { mount };
