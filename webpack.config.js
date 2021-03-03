const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  /* 这个 cache 是默认开启的?
    实验下来并非默认开启
  */
  cache: {
    // filesystem 要比 memory 还要快
    type: "filesystem", // memory filesystem
    // 这个值是一个默认值
    // cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack')
  },
  // 这一段还得重新 在来跟着视频学一遍
  // entry: {
  //   /*
  //   1. deterministic 通过这样的配置,可以让文件的名字变的可以确定
  //   减少缓存失效的问题 , 从而实现一个长期环境

  //   2. named则是通过, 文件的路径来凑出最后输出的文件名字的

  //   3.
  //    */
  //   // moduleIds: 'natural',
  //   // chunkIds: 'natural',
  //   /* 区分chunk和module */
  // },
  // output: {
  //   filename: '[name].js', // 入口代码块文件名的生成规则
  //   chunkFilename: '[name].js', // 非入口模块的生成规则
  //   /*
  //   1. import() 代码调用是非入口
  //   2. split chunks 处理的第三方代码也是非入口
  //   3. common 共享模块也都是非入口文件
  //   */
  // },
  resolve: {
    // 写法1
    // fallback: {
    //   'crypto': require.resolve('crypto-browserify'),
    //   'stream': require.resolve('stream-browserify'),
    //   'buffer': require.resolve('buffer'),
    // },

    // 写法2
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
  devServer: {
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
