var webpack = require('webpack');

module.exports = {
    entry: './js/app.js',
    output: {
        path: './js',
        filename: 'app.bundle.js'
    },
    devtool: 'source-map',
    cache: true,
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
		new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
         loaders: [{
             test: /\.js$/,
             exclude: /(node_modules|bower_components|webstorage\.js)/,
             loader: 'babel-loader',
             query: {
                 presets: ['es2015'],
                 plugins: ['transform-runtime']
             }
         }]
     },
     node: {
         fs: "empty",
     }
};
