const path = require('path')
const webpack = require('webpack')
module.exports = {
  productionSourceMap: false,
  outputDir: 'dist', // 打包之后的文件名称
  assetsDir: 'static', // 放置生成的静态资源（js,css,img,fonts）
  indexPath: 'index.html', // 指定生成index.html的路径
  filenameHashing: 'true', // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  chainWebpack: config => {},
  configureWebpack: {
    devtool:'source-map',
    module: {
      unknownContextCritical: false
    },
    optimization: {
      minimize: process.env.ENV === 'prod'
    }
  },
  pluginOptions: {},
  devServer: {
    open: true, // 自动打开浏览器
    proxy: {
      '/distribution': {
        target: process.env.VUE_APP_Base_Req_Url,
        changeOrigin: true,
        secure: false,
        ws: true,
        // 路径重写
        pathRewrite: {
          '^/distribution':'/distribution'
        }
      }
    }
  }
}
