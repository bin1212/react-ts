const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')
const tsImportPluginFactory = require('ts-import-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const theme = require('../theme')

const htmlTemplate = new HtmlWebpackPlugin({
    template:path.resolve(__dirname,'../public/index.html'),
    hash:true,
    minify:{
      removeRedundantAttributes:true, // 删除多余的属性
      collapseWhitespace:true, // 折叠空白区域
      removeAttributeQuotes: true, // 移除属性的引号
      removeComments: true, // 移除注释
      collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
    },
})
const config = {
    entry:path.resolve(__dirname,'../src/index.tsx'),
    // output:{
    //   filename: '[name].bundle.js',
    //   path:path.resolve(__dirname,'../','dist'),
    //   publicPath:'/',
    // },
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
                      limit: 100,
                      name: 'images/[name].[ext]',
                      // publicPath:path.resolve(__dirname,'public'),
                      // outputPath:'images'
                    },
                    // exclude:[path.join(__dirname, '../public/images')]
                  }
                ]
            },
              {
                test: /\.(png|jpg|gif|webp)$/,
                include: /favicon\.png/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      // publicPath:'./src'
                      // outputPath:'assets/images/' 
                    }
                  },
                  {
                    loader:'html-loader',
                    options:{
                        attrs:['img:src','img:data-src']
                    }
                }
                ]
              },
              // {
              //   test: /\.html$/,
              //   use: {
              //     loader: 'html-loader',
              //     // options: {
              //     //     attrs: ['img:src', 'img:data-src']
              //     // }
              //   }
              // }
        ]
    },
    plugins:[
        htmlTemplate,
        new webpack.WatchIgnorePlugin([
          /css\.d\.ts$/
        ]),
        new CopyWebpackPlugin([
          {from:path.resolve(__dirname,'../public/images'),to:path.resolve(__dirname,'../dist/public/images')}
        ]),
        // new webpack.DllReferencePlugin({
        //   manifest: path.resolve(__dirname, '../dist/dll', 'mainfist.json')
        // }),
    ]
}
module.exports = config;