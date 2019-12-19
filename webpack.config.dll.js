const path = require('path');
const webpack =require('webpack')
const CleanWebpackPlugin  = require('clean-webpack-plugin');

module.exports = {
    // 入口文件
    entry: {
        vendor:['react','react-dom','react-router-dom','redux-saga','react-redux','redux']
    },
    // 输出文件
    output: {
        filename:'dll/_dll_[name].js',
        path:path.resolve(__dirname,'./dist'),
        library:'_dll_[name]'
    },
    // mode:'production',
    plugins:[
        new webpack.DllPlugin({
            name:'_dll_[name]',
            path:path.resolve(__dirname,'./dist/dll','mainfist.json'),
            context: path.resolve(__dirname, "src", "app")
        }),
        new CleanWebpackPlugin(),//删除dll目录下的文件
    ]
  };