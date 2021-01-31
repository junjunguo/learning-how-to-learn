const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        include: [
          path.resolve(__dirname, 'src/**/*.js'),
        ],
        test: /\.html$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // "style-loader",
          MiniCssExtractPlugin.loader, // instead of style-loader
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
    }),
  ],
};
