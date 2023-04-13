const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  // const env = dotenv.config().parsed;
  // // reduce it to a nice object, the same as before
  // const envKeys = Object.keys(env).reduce((prev, next) => {
  //   prev[`process.env.${next}`] = JSON.stringify(env[next]);
  //   return prev;
  // }, {});
  // console.log('env', envKeys);

  return {
    mode: 'development',
    entry: {
      bundle: './client/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
    devtool: 'source-map',
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack App',
        filename: 'index.html',
        template: path.join(__dirname, 'template.html'),
      }),
      new Dotenv(),
      new BundleAnalyzerPlugin(),
    ],
  };
};
