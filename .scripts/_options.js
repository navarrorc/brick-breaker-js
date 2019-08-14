const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Applies to webpack configuration
const statsOptions = {
  colors: true,
  version: true,
  timings: true,
  assets: true,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: false,
  cached: false,
  reasons: false,
  source: false,
  errorDetails: true,
  chunkOrigins: false
};

const globalCssLoader = [
  "css-hot-loader", // see: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34#issuecomment-378594368
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      sourceMap: true,
      importLoaders: 1, //https://survivejs.com/webpack/styling/loading/#processing-css-loader-imports
      url: false // will not parce url() in css
    }
  },
  {
    loader: "sass-loader",
    options: {
      sourceMap: true
    }
  }
];

module.exports = {
  statsOptions,
  globalCssLoader
};
