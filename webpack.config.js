const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    board: './src/board.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ChessT',
      template: "templates/index.html"
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|png)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ttf$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ejs$/i,
        use: ['raw-loader'],
      },
    ],
  },
  resolve: {
    fallback: { path: false, fs: false },
  },
};