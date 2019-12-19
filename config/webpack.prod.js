const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = merge(common,{
    // output:{
    //     publicPath:'./',
    // },
    output:{
        filename: '[name].bundle_[contenthash].js',
        path:path.resolve(__dirname,'../','dist'),
        publicPath:'./',
    },
    mode:'production',
    devtool:'none',
    plugins:[
        new CleanWebpackPlugin({
            //不删除dll文件
            // cleanOnceBeforeBuildPatterns:[
            //     "**/*", "!dll",'!dll/_dll_vendor.js','!dll/mainfist.json'
            // ]
        }),
        new CompressionWebpackPlugin({ //gzip 压缩\
            // asset: '[path].gz[query]',
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' + ['js','css','html'].join('|') + ')$'    //压缩 js 与 css
            ),
            threshold: 10240,
            minRatio: 0.8,
            // deleteOriginalAssets:true  开启会报错
        }),
        // new BundleAnalyzerPlugin({ analyzerPort: 8081 })
    ]
})