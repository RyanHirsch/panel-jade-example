const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".js", ".styl"],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jade$/,
        use: [
          "babel-loader",
          {
            loader: "virtual-jade-loader",
            options: {
              vdom: "snabbdom",
              runtime: `var h = require("panel").h;`,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "head",
      template: "index.template.html",
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
