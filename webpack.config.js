var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: "./public/main.js",
    vendor: [
        './node_modules/element-ui/lib/loading.js',
        './node_modules/element-ui/lib/autocomplete.js',
      './node_modules/element-ui/lib/switch.js',
    './node_modules/element-ui/lib/badge.js']
  },
  output: {
    path: path.join(__dirname, './public/dist'),
    // 文件地址，使用绝对路径形式
    publicPath: '/public/dist/',
    // 公共文件生成的地址
    filename: '[name].js'
    //[name]这里是webpack提供的根据路口文件自动生成的名字

  },
  /*// 服务器配置相关，自动刷新!
  devServer: {
    historyApiFallback: true,
    hot: false
  },*/
  // 加载器
  module: {
    // 加载器
    loaders: [
      // 解析.vue文件
      { test: /\.vue$/, loader: 'vue' },
      // 转化ES6的语法
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      // 编译css并自动添加css前缀
      { test: /\.css$/, loader: 'style!css!autoprefixer'},
      //.scss 文件想要编译，scss就需要这些东西！来编译处理
      //install css-loader style-loader sass-loader node-sass --save-dev
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      // 图片转化，小于8K自动转化为base64的编码
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
      //html模板编译？
      { test: /\.(html|tpl)$/, loader: 'html-loader' }
    ]
  },
  plugins: [
   new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    new webpack.BannerPlugin("Copyright Flying Unicorns inc.")//在这个数组中new一个就可以了
  ],
  resolve: {
    // 用于查找模块的目录
    extensions: ['', '.js', '.vue'],
    // 别名，可以直接使用别名来代表设定的路径以及其他
    alias: {
      filter: path.join(__dirname, './public/filters'),
      components: path.join(__dirname, './public/components'),
      images: path.join(__dirname, './public/images'),
      'vue': 'vue/dist/vue.js'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })]
  },

  // 开启source-map，webpack有多种source-map，在官网文档可以查到
  devtool: false
};
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}