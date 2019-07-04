const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = merge(common,{
    output:{
        publicPath:'./',
    },
    mode:'production',
    devtool:'none',
    plugins:[
        new CleanWebpackPlugin(),
    ]
})