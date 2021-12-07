import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

const mount = (ele) => {
  const app = createApp(Dashboard);
  app.mount(ele);
};

// Check if we're in development mode and in isolation
// Call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");
  devRoot && mount(devRoot);
}

// We are running through the container
// and we should export the mount function
export { mount };
