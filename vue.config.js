const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vuejs/' : '/',
  lintOnSave: false,
  devServer: {
    port: 8080,
    open: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};