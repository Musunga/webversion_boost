import zhCN from './zh-CN.js'
import enUS from './en-US.js'

export default {
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_LOCALE,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
}
