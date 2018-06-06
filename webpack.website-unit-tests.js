const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    'unit-tests': './test/unit/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/test'
  },
  target: 'node',
  node: {
    __dirname: true
  },
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
                browsers: [
                  '> 0.25%',
                  'not dead',
                ],
                android: 7,
                ios: 10,
                ie: 11,
              },
              modules: 'commonjs',
              "useBuiltIns": 'usage',
              "debug": false
            }
          ]],
        }
      }
    }]
  }
});
