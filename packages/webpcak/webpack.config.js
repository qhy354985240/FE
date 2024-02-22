const path = require('path');

// 入门的webpack config文件

// webpack 还可以打包 JavaScript 库 https://webpack.docschina.org/guides/author-libraries/

// webpack 有观察者模式，会根据文件内容改变自动编译，也可以使用内置的dev server来启动web服务 https://webpack.docschina.org/guides/development/#choosing-a-development-tool

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    other: './src/other.js',
    style: './src/style.css'
  },
  output: {
    filename: '[name].[contenthash].js', // 以文件内容为hash值来利用缓存
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    // dev-server 在编译之后不会写入任何输出文件，而是将 bundle 文件保留在内存中，然后将它们作为可访问资源部署在 server 中，就像是挂载在 server 根路径上的真实文件一样
    // 启动web server服务
    static: './dist', // 监听的资源目录
    port: 8888
  },
  optimization: {
    runtimeChunk: 'single', // 将webpack runtime的代码从入口文件分离到一个单独的文件
    splitChunks: {
      chunks: 'all', // 对所有文件进行拆包，有功用的就会拆出来，默认会有一个体积大小限制，大于该体积才会拆分
      cacheGroups: {
        vendor: {
          // 把node_modules下的包拆到一个包里，名字叫vendor
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // 对css文件解析并转转为js的loader，从右到左开始逆序执行
      },
      {
        test: /index.js/,
        sideEffects: false // 代表该文件无副作用，webpack会对其进行tree shaking
      }
    ]
  },
  plugins: []
};
