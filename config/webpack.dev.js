const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common,{
    output:{
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
        
    ]
})