module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: "2",
        exclude: [
          "babel-plugin-transform-async-to-generator",
          "babel-plugin-transform-regenerator",
          "babel-plugin-transform-exponentiation-operator",
        ],
      },
    ],
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-transform-react-jsx", { pragma: "h" }],
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    /*
    Async/await increases file size by a lot.
    ['module:fast-async', {
      'compiler': { 'promises': true, 'generators': false, 'useRuntimeModule': true },
    }],
    ['@babel/plugin-transform-modules-commonjs', {
      'strictMode': false,
    }],
    */
  ],
  env: {
    production: {
      plugins: ["transform-react-remove-prop-types"],
    },
  },
  sourceType: "unambiguous",
};
