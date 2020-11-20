const path = require("path");
const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  mode: "development",
  entry: {
    App: "./index.tsx",
    ChatApp: './chatApp/index.tsx'
  },
  plugins: [
    new BundleTracker({path: __dirname, filename: './webpack-stats.json'})
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../../static/bundle/"),
    publicPath: 'http://localhost:8000/static/bundle/',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      //   {
      //     test: /\.(js|jsx)$/,
      //     exclude: /node_modules/,
      //     use: {
      //       loader: "babel-loader",
      //     },
      //   },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
