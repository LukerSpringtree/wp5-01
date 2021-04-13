const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  cache: {
    type: "filesystem", // memory filesystem
  },
  output: {
    // 那么就是说. 这个output只有配置生产有用?
    path: path.resolve(__dirname, 'LLLTestDist'),
    publicPath: './testPublicPath/',
    publicPath: '/',
    filename: "[name].js", // 入口代码块文件名的生成规则
    chunkFilename: "[name].js", // 非入口模块的生成规则
  },
  resolve: {
    fallback: {
      crypto: false,
      stream: false,
      buffer: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        type: "asset/resource",
      },
      {
        test: /\.ico$/,
        type: "asset/inline",
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.jpg$/,
        type: "asset",
      },
    ],
  },
  /* 
  devServer.publicPath 
  将用于确定 
  bundle 的来源，并具有优先级高于 contentBase。
  
  */

  /* 其实 dev 和 output是独立开来的! 那么怎么确定初始化的配置呢 */
  devServer: {
    port: 8080,
    hot: true,
    // path: '/',
    // publicPath: '/devServerPublicPath',
    /* 这个让初始化的时候, 加载到了本地的资源, 但是.  */
    // publicPath: '/devServerPublicPath',
    // contentBase: './testDist',
    // contentBase: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
