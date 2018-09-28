const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    index: './src/website/index.js',
    introduction: './src/website/introduction/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/website/js'
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: false
    })
  ]
});
