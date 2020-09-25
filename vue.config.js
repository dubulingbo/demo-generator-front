module.exports = {
    devServer: {
        port: 8083,
        open: true,
        proxy: {
            '/api': {//业务类的接口请求地址，这里的api可以是后端的工程名
                changeOrigin: true,
                target: 'http://10.255.60.194:9000/demo/v1.0',
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
}
