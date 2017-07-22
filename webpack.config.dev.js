const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'app/app.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['*', '.css', '.js', '.jsx', '.json'],
  },
  target: 'web',
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /(\.css)$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css', allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true,
      options: {
        context: '/',
        postcss: () => [autoprefixer],
      },
    }),
  ],
};
