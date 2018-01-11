const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './src/website/index.js',
    introduction: './src/website/introduction/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/website/js'
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
