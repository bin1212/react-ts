const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = merge(common,{
    // output:{
    //     publicPath:'./',
    // },
    output:{
        filename: '[name].bundle_[contenthash].js',
        path:path.resolve(__dirname,'../','dist'),
        publicPath:'./',
    },
    // optimization: {
    //     runtimeChunk:'single',
    //     splitChunks: {
    //         cacheGroups:{
    //             vendor:{
    //                 test:/[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks:'all',
    //             }
    //         },
    //     },
    //   },
    mode:'production',
    devtool:'none',
    plugins:[
        new CleanWebpackPlugin(),
    ]
})