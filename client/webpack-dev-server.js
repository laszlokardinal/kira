const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const path = require("path");
const config = require("./webpack.config");

config.entry.unshift(
  `webpack-dev-server/client?http://${process.env.DEV_FRONTEND_HOST}:${
    process.env.DEV_FRONTEND_PORT
  }`
);

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

const options = {
  contentBase: path.join(__dirname, "public"),
  publicPath: "/",
  disableHostCheck: true,
  historyApiFallback: true,
  stats: {
    assets: true,
    chunks: false,
    colors: true,
    modules: false
  },
};

const server = new WebpackDevServer(webpack(config), options);

server.listen(
  process.env.DEV_FRONTEND_PORT,
  process.env.DEV_FRONTEND_HOST,
  (err, result) => {
    if (err) {
      console.log(err);
    }

    console.log(
      `Listening at http://${process.env.DEV_FRONTEND_HOST}:${
        process.env.DEV_FRONTEND_PORT
      }`
    );
  }
);
