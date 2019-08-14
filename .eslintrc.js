module.exports = {
  extends: ["eslint:recommended"],
  settings: {
    react: {
      version: "detect" // React version. "detect" automatically picks the version you have installed.
    }
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    allowImportExportEverywhere: true
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    commonjs: true
  },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": "warn",
    "no-debugger": "warn"
  }
};
