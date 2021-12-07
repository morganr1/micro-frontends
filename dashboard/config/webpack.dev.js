const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConig = require("./webpack.common");
const packageJSON = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8083/",
  },
  devServer: {
    port: 8083,
    headers: {
      "Access-Control-Allow-Origin": "*", // Needed for loading up different font files
    },
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap",
      },
      shared: packageJSON.dependencies,
    }),
  ],
};

module.exports = merge(commonConig, devConfig);
