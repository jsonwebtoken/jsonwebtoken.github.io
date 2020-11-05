const merge = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    entry: {
        index: "./src/extension/index.js",
        webstorage: "./src/extension/injected/webstorage.js",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/extension/js",
    },
});