const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const devConfig = require('./webpack.website-dev.js');

module.exports = merge(devConfig, {
    mode: 'production',
    devtool: false,
    plugins: [
        new UglifyJsPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: true
        })
    ]
});