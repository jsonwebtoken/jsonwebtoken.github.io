const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    'unit-tests': './test/unit/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/test'
  },
  target: 'node',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [[
            '@babel/preset-env', {
              targets: {
                browsers: ["last 5 versions", "safari >= 7"]
              },
              modules: 'commonjs'
            }
          ]]
        }
      }
    }]
  }
});
