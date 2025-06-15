const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // 开发服务器配置
  devServer: {
    port: 8086, // 前端端口设置为8086
    proxy: {
      // 配置后端API代理，解决跨域问题
      '/api': {
        target: 'http://localhost:8087', // 后端端口8087
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})