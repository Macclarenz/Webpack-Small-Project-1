const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
        assetModuleFilename: 'images/[name][ext][query]',

    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '' }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/transform-runtime'
                        ]
                    }
                }
            },
            {
                test: /\.(png|svg|jpeg|jpg)$/i,      
                type: 'asset/resource'
            },
            {   // - handles images like <img src = 'path/file.svg'/>
                test: /\.html$/i,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        })
    ],
    stats: {
        errorDetails: true,
        children: true
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'src'),

        },
        port: 3000,
        // open: true,
        hot: true,
        // compress: true,
        // historyApiFallback: true,
    }
}