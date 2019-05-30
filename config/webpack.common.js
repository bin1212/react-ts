const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

const htmlTemplate = new HtmlWebpackPlugin({
    template:path.resolve(__dirname,'../public/index.html'),
    title:'嘿嘿'
})
const config = {
    entry:path.resolve(__dirname,'../src/index.tsx'),
    output:{
        filename: '[name].bundle.js',
        path:path.resolve(__dirname,'../','dist')
    },
    resolve:{
        extensions:['.ts','.tsx','.js','.json']
    },
    module: {
        rules:[
            {test:/\.tsx?$/,loader:'awesome-typescript-loader'},
            // {enforce:"pre",test:/\.js$/,loader:'source-map-loader'},
        ]
    },
    plugins:[
        htmlTemplate,
        new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     title: '模块热替换'
        //   }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
module.exports = config;