const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    index: './src/extension/index.js',
    webstorage: './src/extension/injected/webstorage.js',
    'check-install': './src/extension/content-scripts/check-install.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/extension/js'
  }
});
