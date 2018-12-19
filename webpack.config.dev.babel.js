import path from 'path';
import webpack from 'webpack';
// import merge from 'webpack-merge';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { stringify } from 'querystring';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const devMode = process.env.NODE_ENV !== 'production';

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
  title: '',
});

// const miniCssPlugin = new MiniCssExtractPlugin({
//   filename: "[name].css",
//   chunkFilename: "[id].css"
// });

export default {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'babel-regenerator-runtime',
    path.join(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'web',
  resolve: {
  //   alias: {
  //     '~': path.resolve(__dirname, 'node_modules'),
  //   },
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    htmlPlugin,
    // miniCssPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true,
      }
    }),

  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      // {
      //   test: /\.css$/,
      //   loaders: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      // },
      // {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'file-loader',
      // },
      // {
      //   test: /\.(woff|woff2)$/,
      //   loader: 'url-loader?prefix=font/&limit=5000',
      // },
      // {
      //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      // },
      // {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      // },
      // {
      //   enforce: 'pre',
      //   test: /\.jsx?$/,
      //   include: path.join(__dirname, 'src'),
      //   exclude: /node_modules/,
      //   loaders: ['eslint-loader'],
      // },
    ],
  },
  mode: 'development',
  // devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'src'),
  //   hot: true,
  //   open: true,
  //   historyApiFallback: true,
  //   disableHostCheck: true,
  // },
};
