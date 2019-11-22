var path = require('path');

module.exports = {
    entry: './lib/app.ts',
    target: "node",
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'tslint-loader',
            },
            {
                use: 'ts-loader',
                test: /\.ts$/,
                exclude: /node_modules/
            },
        ]
    },
};