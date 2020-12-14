const webpack = require("webpack");
const getLanguages = require("./views/website/libraries/support/get-languages.js");

module.exports = {
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    browsers: ["> 0.25%", "not dead"],
                                    android: 7,
                                    ios: 10,
                                    ie: 11,
                                },
                                modules: false,
                            },
                        ],
                    ],
                },
            },
        }, ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            languages: getLanguages(),
        }),
    ],
};