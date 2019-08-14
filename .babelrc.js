const presets = [
  [
    "@babel/env",
    {
      targets: {
        browsers: ["last 2 versions"]
      },
      corejs: "3",
      useBuiltIns: "usage"
    }
  ]
];

// see: plugin-proposal-class-properties https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
// see: react-css-modules https://github.com/gajus/babel-plugin-react-css-modules#configuration
const plugins = ["@babel/plugin-proposal-class-properties"];

module.exports = { presets, plugins };
