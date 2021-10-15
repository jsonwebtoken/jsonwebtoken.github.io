const webpack = require("webpack");

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
        }),
    ]
};
