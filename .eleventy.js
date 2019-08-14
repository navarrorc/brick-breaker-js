const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // see: https://www.11ty.io/docs/config/#transforms-example%3A-minify-html-output
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
  eleventyConfig.addPassthroughCopy("./11ty/assets");
  eleventyConfig.addPassthroughCopy("./11ty/images");

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid",
    passthroughFileCopy: true,
    dir: {
      input: "11ty",
      layouts: "_layouts"
      /* Defaults: output: _site, includes: _includes, data: _data
      see: https://www.11ty.io/docs/config */
    }
  };
};
