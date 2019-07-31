const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common,{
    output:{
        filename: '[name].bundle.js',
        path:path.resolve(__dirname,'../','dist'),
        publicPath:'/',
    },
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        // contentBase:path.join(__dirname,"public"),
        inline:true,
        port:9000,
        // open:true,
        hot:true,
        historyApiFallback:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ]
})