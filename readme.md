# 三个重大更新
1. 持久化缓存
2. tree-shaking
3. module federation

# 持久化缓存
  .cache 代码块啊, 模块块啊, 生成一个缓存 生成一个快照.

### 第一次使用了接近3s
asset main.js 985 KiB [emitted] (name: main)
asset index.html 276 bytes [emitted]
runtime modules 274 bytes 1 module
modules by path ./node_modules/ 979 KiB
  modules by path ./node_modules/_scheduler@0.20.1@scheduler/ 31.8 KiB
    modules by path ./node_modules/_scheduler@0.20.1@scheduler/*.js 412 bytes 2 modules
    modules by path ./node_modules/_scheduler@0.20.1@scheduler/cjs/*.js 31.4 KiB
      ./node_modules/_scheduler@0.20.1@scheduler/cjs/scheduler.development.js 22.6 KiB [built] [code generated]
      ./node_modules/_scheduler@0.20.1@scheduler/cjs/scheduler-tracing.development.js 8.79 KiB [built] [code generated]
  modules by path ./node_modules/_react@17.0.1@react/ 70.6 KiB
    ./node_modules/_react@17.0.1@react/index.js 190 bytes [built] [code generated]
    ./node_modules/_react@17.0.1@react/cjs/react.development.js 70.5 KiB [built] [code generated]
  modules by path ./node_modules/_react-dom@17.0.1@react-dom/ 875 KiB
    ./node_modules/_react-dom@17.0.1@react-dom/index.js 1.33 KiB [built] [code generated]
    ./node_modules/_react-dom@17.0.1@react-dom/cjs/react-dom.development.js 874 KiB [built] [code generated]
  ./node_modules/_object-assign@4.1.1@object-assign/index.js 2.06 KiB [built] [code generated]
./src/index.js 139 bytes [built] [code generated]
webpack 5.24.2 compiled successfully in 730 ms
✨  Done in 2.89s.

### 第二次只使用了 1.32s  (哪怕把电脑关了, 之后的编译任然是1.32s)
yarn run v1.22.4
$ webpack
asset main.js 985 KiB [compared for emit] (name: main)
asset index.html 276 bytes [compared for emit]
cached modules 980 KiB (javascript) 274 bytes (runtime) [cached] 11 modules
webpack 5.24.2 compiled successfully in 326 ms
✨  Done in 1.32s.

## 
webapack4是需要通过 一些loader 才能实现类似的功能, 但是webpack已经把这些功能内置了.

### 
  ps 如果 cache 的type值为 filesystem 的话,
  那么就能使用cnpm 的命令来安装模块了

  原因: 
  是因为 用 cnpm来安装的话, 包名会有
  _@bable_code 就是说会以  _@为开头

### 就是说如果使用 webpack5的话就不要用 cnpm了
issues 地址
`https://github.com/cnpm/cnpm/issues/335`

#
raw-loader file-loader url-loader 这3个loader都不需要安装了

```json
 {
  test: /\.png$/,
  type: 'asset/resource'
},
{
  test: /\.ico$/,
  type: 'asset/inline'
},
{
  test: /\.txt$/,
  type: 'asset/source'
},
{
  test: /\.jpg$/,
  type: 'asset'
},
```



## moduleIds & chunkIds 的优化

## 移除Node.js的polyfill
###  BREAKING CHANGE: 
就是一些不兼容的改变.
### 
yarn run v1.22.4
$ webpack
assets by status 0 bytes [cached] 1 asset
asset main.js 1.17 MiB [compared for emit] (name: main)
asset index.html 276 bytes [emitted]
runtime modules 1.98 KiB 6 modules
modules by path ./node_modules/crypto-js/*.js 204 KiB 34 modules
modules by path ./src/ 744 bytes (javascript) 1 bytes (asset) 5 modules
modules by path ./node_modules/scheduler/ 31.8 KiB
  modules by path ./node_modules/scheduler/*.js 412 bytes 2 modules
  modules by path ./node_modules/scheduler/cjs/*.js 31.4 KiB
    ./node_modules/scheduler/cjs/scheduler.development.js 22.6 KiB [built] [code generated]
    ./node_modules/scheduler/cjs/scheduler-tracing.development.js 8.79 KiB [built] [code generated]
modules by path ./node_modules/react/ 70.6 KiB
  ./node_modules/react/index.js 190 bytes [built] [code generated]
  ./node_modules/react/cjs/react.development.js 70.5 KiB [built] [code generated]
modules by path ./node_modules/react-dom/ 875 KiB
  ./node_modules/react-dom/index.js 1.33 KiB [built] [code generated]
  ./node_modules/react-dom/cjs/react-dom.development.js 874 KiB [built] [code generated]
./node_modules/object-assign/index.js 2.06 KiB [built] [code generated]

WARNING in ./node_modules/crypto-js/core.js 43:22-39
Module not found: Error: Can't resolve 'crypto' in '/Users/ludejing/Documents/学习文件夹/1.webpack/Webpack5/2.zf-webpack5/node_modules/crypto-js'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "crypto": require.resolve("crypto-browserify") }'
        - install 'crypto-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "crypto": false }
 @ ./node_modules/crypto-js/index.js 4:37-54
 @ ./src/index.js 3:0-33 8:12-24

1 warning has detailed information that is not shown.
Use 'stats.errorDetails: true' resp. '--stats-error-details' to show it.

webpack 5.24.2 compiled with 1 warning in 910 ms
✨  Done in 2.37s.

# 默认不引入node 的pollyfill 这样可以减少,最后打包体积的产物

##
fallback 注意是fallback 不是 callback, 那么什么是fallback
fallback 就是第二途径, 即所谓备胎, 回退

### 
webpack的作者sokra
sokra他之前是不做前端的. 这是一个java大佬
webpack现在更加专注于打包前端项目.

# 
webpack4 的treeShark 比较弱

webpack5
```json
{
  optimizatioan: {
    usedExports: true, // 标是用到的导出, 但是并不会干掉
  }
}
```

核心概念 deep-scope-demo

# 
sideEffects: 表示没有

sideEffects: false, // 表示没有副作用

sideEffects: ['*.css'] , // 标示除了css 是要保留的之外, 其他都不要保留.

# 


# 研究输出, 看看webpack究竟往命令行写了什么
ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from ./testPublicPath/
ℹ ｢wds｣: Content not from webpack is served from /Users/ludejing/github/wp5-01

















# vs code 的插件
import cost

# 
nest.js node框架
nuxt.js vue ssr框架
next.js react ssr框架

# 
