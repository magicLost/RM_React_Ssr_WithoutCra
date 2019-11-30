const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

const merge = require("webpack-merge");
//const common = require("./webpack.common.js");
const prod = require("./webpack.prod.js");

//const merged = merge(common, prod);

//const useVersioning = true;

const config = merge(prod, {
  entry: "./php_ssr/makeRenderFiles.tsx",

  target: "node",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "php_ssr", "dist")
  },

  externals: [webpackNodeExternals()],

  node: {
    __dirname: false
  }
});

//console.log(config);
//console.log(config.module.rules);

module.exports = config;
