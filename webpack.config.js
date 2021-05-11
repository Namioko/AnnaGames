const path = require('path');

module.exports = () => ({
    mode: 'development',
    target: 'node',
    entry: './dev/index.js',
    output: {
        filename: './dist/bundle.js',
        path: path.resolve(__dirname, '.'),
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /^(?!.*test\.js).*\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    }
});