module.exports = {
    lintOnSave: false,   //关闭语法检查

    // 开启代理服务器(方式一)
    // devServer:{
    //     // 地址为服务器地址
    //     proxy: 'http://localhost:5000'
    // }
    //开启代理服务器（方式二）
    devServer: {
        proxy: {
            '/api':{
                target:'http://localhost:10086',
                pathRewrite:{'^/api':''},
                ws: true,   //用于支持webSocket
                changeOrigin: true,    //伪造请求服务器地址（用于控制请求头host的值）
            },
            '/api2':{
                target:'http://localhost:5001',
                pathRewrite:{'^/api2':''},
                ws: true,   //用于支持webSocket
                changeOrigin: true,    //伪造请求服务器地址（用于控制请求头host的值）
            },
        }
    }
}





