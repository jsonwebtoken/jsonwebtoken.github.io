const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const devConfig = require('./webpack.extension-dev.js');

module.exports = merge(devConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    new UglifyJsPlugin()
  ]
});
