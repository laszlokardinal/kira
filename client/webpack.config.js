require("dotenv").config();

const webpack = require("webpack");
const path = require("path");

const autoprefixer = require("autoprefixer");

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, "src"),
  entry: ["./index.js"],
  output: {
    path: path.join(__dirname, "./"),
    publicPath: "/",
    filename: "public/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/(webpack-dev-server))/,
        loader: "babel-loader"
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
          { loader: "postcss-loader", options: { plugins: [autoprefixer()] } },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve("./src"), "node_modules"]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: process.env.NODE_ENV === "production",
      debug: false
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};
