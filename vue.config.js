module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 8083,
        open: true,
        proxy: {
            '/api': {//业务类的接口请求地址，这里的api可以是后端的工程名
                changeOrigin: true,
                target: 'http://10.255.47.100:9000/demo/v1.0',
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
}
