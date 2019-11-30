const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  entry: path.join(__dirname, "test", "index.js"),

  output: {
    filename: "static/js/[name].[chunkhash:6].js",
    //path: path.join(__dirname, "static", "js")
    path: path.join(__dirname, "test", "builds"),
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, "src"), path.join(__dirname, "php_ssr")],
        loader: "babel-loader"
      },
      {
        test: /\.svg$/,
        loaders: [
          { loader: "file-loader?name=static/media/[name]-[hash:7].[ext]" }
        ]
      }
    ]
  },

  plugins: [
    new webpack.WatchIgnorePlugin([
      "global.d.ts",
      "scss/.d.ts$/",
      "css/.d.ts$/",
      "svg/.d.ts$/"
    ]),
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      filename: "assets-manifest.json"
      //writeToFileEmit: true, //needs if we in dev mode with devServer
      //basePath: "/",
      //publicPath: "/"
    })
  ]
};
