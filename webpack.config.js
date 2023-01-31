/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'messenger.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css'],
    alias: {
      'core': path.resolve(__dirname, "src/core"),
      'components': path.resolve(__dirname, "src/components"),
      'helpers': path.resolve(__dirname, "src/helpers"),
      'pages': path.resolve(__dirname, "src/pages"),
      'utils': path.resolve(__dirname, "src/utils"),
      'api': path.resolve(__dirname, "src/api"),
      'services': path.resolve(__dirname, "src/services"),
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              transpileOnly: true,
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
          {
            loader: 'postcss-loader',
          }
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'src', 'assets'),
          to: './assets',
        }
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
};
