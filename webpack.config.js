const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    website: './src/website/index.js',
    //extension: './src/extension/index.js'
  },
  output: {
    filename: '[name]/js/index.js',
    path: __dirname + '/dist'
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
                browsers: ["last 5 versions", "safari >= 7"]
              },
              modules: false
            }
          ]]
        }
      }
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
