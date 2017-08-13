const path = require("path");

const webpack = require('webpack');
const nodeRoot = path.join( __dirname, 'node_modules' )

module.exports = {
  context: path.resolve(__dirname, './src'),
  // devtool: 'inline-source-map',
  entry: {
    "index": "./server.js"
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    publicPath: "/public/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.html', '.js', '.vue', '.ts']
  },
  module: {
    rules:[{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude:["node_modules/*"]
    },
    {
      test: /\.ts$/,
      loaders: [
        'babel-loader',
        'ts-loader'
      ],
      exclude: ["node_modules/*"]
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader",
    },
    {
      test: /\.html$/,
      loader: "html-loader",
      exclude:["node_modules/*"]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};