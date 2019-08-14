const fs = require("fs");
const path = require("path");
const assetsFolder = "../assets";

module.exports = function() {
  // console.log("*******");
  // // console.log(files);
  // console.log(process.env.NODE_ENV);
  // console.log("*******");

  if (process.env.NODE_ENV !== "production") {
    return {
      css: "/assets/main-bundle.css",
      vendors: "/assets/vendors~main-bundle.js",
      js: "/assets/main-bundle.js"
    };
  }

  // Get files bundles names from disk
  const files = fs.readdirSync(path.resolve(__dirname, assetsFolder));

  if (files.length) {
    // Files were found
    const filteredFiles = files.filter(file => {
      return !file.includes(".map") && !file.includes(".gz");
    });

    const css = "/assets/" + filteredFiles.find(file => file.includes(".css"));
    const vendors =
      "/assets/" +
      filteredFiles.find(file => (file.match(/^vendors.*\.js/) ? true : false));
    const js =
      "/assets/" +
      filteredFiles.find(file => (file.match(/^main.*\.js/) ? true : false));

    return {
      css,
      vendors,
      js
    };
  }
};
