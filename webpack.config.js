/* eslint-env node */
const path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const ROOT_DIR = path.resolve(__dirname)
const SRC_DIR = path.resolve(ROOT_DIR, 'src')
const EXAMPLE_DIR = path.resolve(ROOT_DIR, 'example')

module.exports = (env) => ({
    mode: env || 'development',

    entry: {
        app: path.join(EXAMPLE_DIR, 'index.ts'),
        styles: path.join(EXAMPLE_DIR, 'styles/app.scss'),
    },

    output: {
        filename: '[name].bundle.js',
        path: path.join(ROOT_DIR, 'dist'),
    },

    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json',
            '.jsx'
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'grand-central': SRC_DIR,
        },
    },

    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                include: [
                    SRC_DIR,
                    EXAMPLE_DIR,
                ],
                use: [
                    {
                        loader: 'cache-loader',
                    },
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: [
                    SRC_DIR,
                    EXAMPLE_DIR,
                ],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                include: [
                    SRC_DIR,
                    EXAMPLE_DIR,
                ],
                use: 'raw-loader',
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg|png)$/,
                include: [
                    SRC_DIR,
                    EXAMPLE_DIR,
                ],
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.vue$/,
                include: [
                    SRC_DIR,
                    EXAMPLE_DIR,
                ],
                loader: 'vue-loader',
            }
        ],
    },

    devServer: {
        port: 9000,
        host: 'localhost',
        contentBase: './dist',
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
            }),
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(EXAMPLE_DIR, 'index.html'),
            includeChunks: ['app'],
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
    ],
})
