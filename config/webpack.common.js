const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const tsImportPluginFactory = require('ts-import-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const theme = require('../theme')

const htmlTemplate = new HtmlWebpackPlugin({
    template:path.resolve(__dirname,'../public/index.html'),
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
            {
              test:/\.ts|.tsx?$/,
              exclude: /node_modules/,
              use:[
                {
                  loader:'awesome-typescript-loader',
                  options:{
                    useBabel: false, 
                    getCustomTransformers:()=>({
                      before:[
                        tsImportPluginFactory({
                          libraryName:'antd',
                          libraryDirectory:'lib',
                          //引入antd的less
                          style:true
                        })
                      ]
                    })
                  }
                },
              ]
            },
            {enforce:"pre",test:/\.js$/,loader:'source-map-loader'},
            {test:/\.css$/,
              exclude: /node_modules/,
              // loader:'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
              use:['style-loader','css-loader']
            },
            {test:/\.less$/,
              
              use:[
              'style-loader','css-loader',
              //是antd的模块引入失败，后续再研究配置
              // {
              //   loader: 'typings-for-css-modules-loader',
              //   options: {
              //       modules: true,
              //       namedExport: true,
              //       camelCase: true,
              //       // minimize: true,
              //       importLoaders:1,
              //       localIdentName: "[local]_[hash:base64:5]"
              //   }
              // },
              {
                loader:'less-loader',
                options:{
                  javascriptEnabled:true,
                  modifyVars:theme,
                  sourceMap: true
                }
              }
            ]
          },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      name: '[name].[ext]',
                      // publicPath:'../public',
                      outputPath:'public/images'
                    }
                  }
                ]
            },
              {
                test: /\.(png)(\?.+)?$/,
                include: /favicon\.png/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]'
                    }
                  }
                ]
              },
              // {
              //   test: /\.(html|tpl)$/,
              //   use: [ 'html-loader' ]
              // }
        ]
    },
    plugins:[
        htmlTemplate,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.WatchIgnorePlugin([
          /css\.d\.ts$/
        ]),
    ]
}
module.exports = config;