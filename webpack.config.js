const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    output: {
        path: __dirname + '/public'
    },
    entry: {
        app: './src/index.ts'
    },

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {}
                }]
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [{
                    loader: 'tslint-loader',
                    options: {}
                }]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body'
        })
    ]
};