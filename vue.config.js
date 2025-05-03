const path = require('path');

module.exports = {
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