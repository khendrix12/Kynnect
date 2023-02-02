const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development',
  entry: {
    bundle: ('./client/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    // clean: true,
    // assetModuleFilename: '[name][ext]',
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
        use: [
          'style-loader', 'css-loader', 'sass-loader',
        ],
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
      // {
      //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //     type: 'asset/resource',
      // }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: path.join(__dirname, 'template.html'),
    }),
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    fallback: {
      querystring: false,
      fs: false,
      tls: false,
      net: false,
      path: false,
      //   zlib: false,
      http: false,
      https: false,
      //   stream: false,
      crypto: false,
      url: false,
      util: false,
      buffer: false,
      // zlib: require.resolve('browserify-zlib'),
      // stream: require.resolve('stream-browserify'),
    },
  },
};
