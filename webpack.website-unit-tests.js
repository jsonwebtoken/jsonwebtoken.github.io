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
  },
  resolve: {
    alias: {
      'jose/key/import': 'jose/dist/node/cjs/key/import',
      'jose/key/export': 'jose/dist/node/cjs/key/export',
      'jose/jws/compact/sign': 'jose/dist/node/cjs/jws/compact/sign',
      'jose/jws/compact/verify': 'jose/dist/node/cjs/jws/compact/verify',
      'jose/jwks/remote': 'jose/dist/node/cjs/jwks/remote',
      'jose/jwk/embedded': 'jose/dist/node/cjs/jwk/embedded',
    }
  }
});
