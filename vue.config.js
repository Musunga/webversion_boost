module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  assetsDir: 'static',

  devServer: {
    disableHostCheck: true,
    proxy: {
      '/cdb-app-api/v1/app/': {
        // target: 'https://test.superlemon.top/',
        // target: 'https://app.goodlucktrading.net/',
        // target: 'https://app.chargenow.top/',
        target: 'https://app.telpaygroup.dev',
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'langs',
      enableInSFC: true
    }
  }
}
