const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const target = process.env.TARGET || 'browser';
module.exports = {
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    output: {
        path: __dirname + '/public',
    },
    entry: {
        app: './src/index.ts',
    },

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new HtmlWebpackPlugin({
            template: target === 'browser' ? 'src/index.html' : 'src/index-electron.html',
            inject: 'body',
            hash: true,
        }),
        new webpack.DefinePlugin({
            IS_ELECTRON_BUILD: target === 'electron',
        }),
        new FaviconsWebpackPlugin('./logo.png'),
    ],
};
