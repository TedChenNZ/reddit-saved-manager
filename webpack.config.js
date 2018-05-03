const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';

const getStyleLoaders = () => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoader: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
  };
  if (PROD) {
    return ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoader: 1,
            localIdentName: '[local]___[hash:base64:5]',
          },
        },
        cssLoader,
      ],
    });
  }

  const loaders = [
    'style-loader',
    cssLoader,
  ];
  return loaders;
};

module.exports = {
  entry: {
    main: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: `styles.${PROD ? '[chunkhash]' : '[hash]'}.css`, allChunks: true }),
    new HtmlWebpackPlugin({
      inject: false,
      has: true,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `[name].${PROD ? '[chunkhash]' : '[hash]'}.bundle.js`,
  },
};
