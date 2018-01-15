const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    index: './src/extension/index.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/extension/js'
  }
});
