const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './index.js'],
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
