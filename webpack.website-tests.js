const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    'unit-tests': './test/unit/index.js',
    'functional-tests': './test/functional/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/test'
  },
  target: 'node'
});
