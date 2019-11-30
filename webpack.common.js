const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", ".css", ".svg", ".png"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.join(__dirname, "src"), path.join(__dirname, "php_ssr")],
        loader: "babel-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader?name=static/font/[name]-[hash:7].[ext]"
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
    new HtmlWebpackPlugin({
      title: "Output Management",
      template: path.join(__dirname, "config", "index.html")
    })
  ]
};
