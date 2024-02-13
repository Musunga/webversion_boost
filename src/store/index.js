import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    safeArea: JSON.parse(localStorage.getItem('cdb_safe_area')) || { top: 0, bottom: 0 },
    user: JSON.parse(localStorage.getItem('cdb_user')),
    userPwd: JSON.parse(localStorage.getItem('cdb_user_pwd')),
    token: localStorage.getItem('cdb_token'),
    loading: false,
    qrcode: sessionStorage.getItem('cdb_qrcode'),
    zhcode: sessionStorage.getItem('cdb_zhcode'),
    lang: localStorage.getItem('cdb_lang') || process.env.VUE_APP_I18N_LOCALE,
    system: localStorage.getItem('cdb_system') || '',
    browser: localStorage.getItem('cdb_browser') || '',
    cabinet: null,
    localeArr: [
      { key: 0, label: '简体中文', value: 'zh-CN', currency: '元', money: '￥' },
      { key: 1, label: 'English', value: 'en-US', currency: 'dollar', money: '$' }
    ]
  },
  getters: {
    locale: state => {
      return state.localeArr.find(obj => obj.value === state.lang)
    }
  },
  mutations: {
    safeArea (state, payload) {
      localStorage.setItem('cdb_safe_area', JSON.stringify(payload))
      state.safeArea = payload
    },
    user (state, payload) {
      localStorage.setItem('cdb_user', JSON.stringify(payload))
      state.user = payload
    },
    userPwd (state, payload) {
      localStorage.setItem('cdb_user_pwd', JSON.stringify(payload))
      state.userPwd = payload
    },
    token (state, payload) {
      localStorage.setItem('cdb_token', payload)
      state.token = payload
    },
    loading (state, payload) {
      state.loading = payload
    },
    qrcode (state, payload) {
      sessionStorage.setItem('cdb_qrcode', payload)
      state.qrcode = payload
    },
    zhcode (state, payload) {
      sessionStorage.setItem('cdb_zhcode', payload)
      state.zhcode = payload
    },
    lang (state, payload) {
      localStorage.setItem('cdb_lang', payload)
      state.lang = payload
    },
    system (state, payload) {
      localStorage.setItem('cdb_system', payload)
      state.system = payload
    },
    browser (state, payload) {
      localStorage.setItem('cdb_browser', payload)
      state.browser = payload
    },
    cabinet (state, payload) {
      state.cabinet = payload
    }
  },
  actions: {}
})
