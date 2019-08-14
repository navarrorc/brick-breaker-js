const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const dotenv = require("dotenv");
const { statsOptions, globalCssLoader } = require("./.scripts/_options.js");

// call dotenv and it will return an Object with a parsed key
// see: https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

// TODO: find a better way
if (process.env.DESTINATION_ENV) {
  envKeys["process.env.DESTINATION_ENV"] = JSON.stringify(
    process.env.DESTINATION_ENV
  );
}

/**
 * Common Webpack Configuration
 */
const commonConfig = merge([
  {
    entry: {
      main: ["./src/main.js"]
    },
    output: {
      path: path.resolve(__dirname, "./11ty/assets"),
      filename: "[name]-bundle.js",
      publicPath: "/assets/"
    },
    stats: statsOptions,
    optimization: {
      splitChunks: {
        chunks: "initial"
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin(envKeys)
      // new CompressionPlugin() // generate gzip files
    ],
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(js)$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(js)$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          include: fs.realpathSync("./src/scss"), // Global Styles
          use: globalCssLoader
        }
      ]
    }
  }
]);

/**
 * Dev Webpack Configuration
 */
const devConfig = merge([
  {
    mode: "development",
    watch: true,
    devtool: "inline-source-map",
    devServer: {
      host: "0.0.0.0",
      useLocalIp: true,
      publicPath: "/assets/",
      contentBase: path.resolve(__dirname, "./_site"),
      watchContentBase: true, // live-reload when shell page changes
      hot: true,
      inline: true,
      compress: true,
      overlay: true,
      port: 8080,
      stats: statsOptions
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name]-bundle.css"
      })
    ]
  }
]);

/**
 * Production Webpack Configuration
 */
const prodConfig = merge([
  {
    mode: "production",
    output: {
      filename: "[name]-bundle.[contentHash].js"
    },
    // devtool: "source-map",
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name]-bundle.[contentHash].css"
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: false // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  }
]);

module.exports = () => {
  if (process.env.NODE_ENV === "production") {
    return merge(commonConfig, prodConfig);
  }

  return merge(commonConfig, devConfig);
};
