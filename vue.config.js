module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  productionSourceMap: true,
  pages: {
    index: {
      entry: "src/main.js",
      title: "电子签名"
    }
  },
  devServer: {
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080 // 端口配置
  }
}