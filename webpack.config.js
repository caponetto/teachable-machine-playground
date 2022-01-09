const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = async () => [
  {
    entry: {
      index: "./src/index.tsx",
    },
    devtool: "inline-source-map",
    performance: {
      maxEntrypointSize: 1024 * 1024 * 25,
      maxAssetSize: 1024 * 1024 * 25,
    },
    output: {
      path: path.resolve("./dist"),
      filename: "[name].js",
      sourceMapFilename: "[name].js.map",
    },
    stats: {
      excludeModules: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                compilerOptions: {
                  sourceMap: false,
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      modules: [path.resolve("./node_modules"), path.resolve("./src")],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "./static/models", to: "./static/models" },
          { from: "./static/images", to: "./static/images" },
          { from: "./static/favicon", to: "./static/favicon" },
          { from: "./static/sounds", to: "./static/sounds" },
          { from: "./static/site.webmanifest", to: "./site.webmanifest" },
          { from: "./static/sw.js", to: "./sw.js" },
        ],
      }),
      new HtmlWebpackPlugin({
        template: "./static/index.html",
        inject: false,
        minify: false,
      }),
    ],
    devServer: {
      https: true,
      host: "0.0.0.0",
      port: 9001,
      compress: true,
      historyApiFallback: true,
      static: [path.join(__dirname, "./dist"), path.join(__dirname, "./static")],
    },
  },
];
