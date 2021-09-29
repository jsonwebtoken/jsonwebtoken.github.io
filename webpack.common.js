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
    ],
    resolve: {
        alias: {
            'jose/key/import': 'jose/dist/browser/key/import',
            'jose/key/export': 'jose/dist/browser/key/export',
            'jose/jws/compact/sign': 'jose/dist/browser/jws/compact/sign',
            'jose/jws/compact/verify': 'jose/dist/browser/jws/compact/verify',
            'jose/jwks/remote': 'jose/dist/browser/jwks/remote',
            'jose/jwk/embedded': 'jose/dist/browser/jwk/embedded',
        }
    }
};
