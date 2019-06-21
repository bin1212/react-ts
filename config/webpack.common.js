const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const tsImportPluginFactory = require('ts-import-plugin')
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
            {test:/\.css$/,exclude: /node_modules/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:[
              'style-loader','css-loader',
              {
                loader:'less-loader',
                options:{
                  javascriptEnabled:true,
                  modifyVars:theme
                }
              }
            ]},
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
    ]
}
module.exports = config;