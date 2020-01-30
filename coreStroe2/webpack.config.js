const path = require("path");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: 'lib.js',
        library: 'testLib',
        libraryTarget: 'this'
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        },
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname,"src")
                ],
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['js'],
    }
}