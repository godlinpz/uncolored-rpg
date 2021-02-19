const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    mode: NODE_ENV || 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    watch: NODE_ENV === 'development',
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.(c|sa|sc)ss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 3,
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                                auto: /\.module.\.\w+$/i
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'assets', to: 'assets'} ]
        })
    ],

    devServer: {
        port: 3002,
        overlay: true,
        open: true,
        hot: true,
        historyApiFallback: true,
    },

    devtool: 'source-map',
}