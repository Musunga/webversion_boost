import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { Page } from './components/layouts'
import { get, post } from './utils/http'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import 'lib-flexible/flexible.js'
import Toast from './components/toast'
import Confirm from './components/confirm'
import VueI18n from 'vue-i18n'
import langs from './langs'
import dayjs from 'dayjs'

Vue.config.productionTip = true
Vue.use(VueI18n)

Vue.$get = Vue.prototype.$get = get
Vue.$post = Vue.prototype.$post = post
Vue.$loading = Vue.prototype.$loading = (param) => {
  store.commit('loading', param)
}
Vue.$toast = Vue.prototype.$toast = Toast
Vue.$confirm = Vue.prototype.$confirm = Confirm

Vue.component('page', Page)
Vue.component('StreamBarcodeReader', StreamBarcodeReader)

const i18n = new VueI18n(langs)

Vue.prototype._i18n = i18n

i18n.locale = store.state.lang

Vue.filter('dateFmt', function (value) {
  const diff = 8 + new Date().getTimezoneOffset() / 60
  return dayjs(value).add(-diff, 'hour').format('YYYY-MM-DD HH:mm:ss')
})
Vue.filter('decode', function (value) {
  if (value.length >= 5 && value.length % 5 === 0 && value.indexOf('u') >= 0) {
    return unescape(value.replace(/u/g, '%u'))
  } else {
    return value
  }
})

String.prototype.format = function () {
  if (arguments.length === 0) return this
  const param = arguments[0]
  let str = this
  if (typeof (param) === 'object') {
    for (let key in param) {
      str = str.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key])
    }
    return str
  } else {
    for (let i = 0; i < arguments.length; i++) {
      str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i])
    }
    return str
  }
}

const ua = navigator.userAgent.toLowerCase()
// if (ua.indexOf('micromessenger') > -1) {
//   store.commit('browser', 'wechat')
// } else if (ua.indexOf('alipay') > -1) {
//   store.commit('browser', 'alipay')
// }
if (ua.indexOf('android') > -1) {
  store.commit('system', 'android')
} else if (ua.indexOf('iphone') > -1) {
  store.commit('system', 'ios')
}

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
