const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './index.js'],
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, "./index.js"),
                ]
            }
        ]
    }
};
