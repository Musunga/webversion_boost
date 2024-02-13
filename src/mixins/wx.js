import {
  JS_CONFIG
} from '../apis/user.js'
import {
  mapState
} from 'vuex'
var wxscript
export default {
  computed: {
    ...mapState(['browser'])
  },
  methods: {
    loadWXScript (apiList) {
      const ua = navigator.userAgent.toLowerCase()
      if (!wxscript && ua.indexOf('micromessenger') > -1) {
        this.$store.commit('browser', 'wechat')
        wxscript = window.document.createElement('script')
        wxscript.src = '//res.wx.qq.com/open/js/jweixin-1.4.0.js'
        wxscript.onload = () => {
          this.loadWXConfig(apiList)
        }
        var head = window.document.head || window.document.getElementsByTagName('head')[0] || window.document.documentElement
        head.insertBefore(wxscript, head.firstChild)
      } else if (wxscript) {
        this.loadWXConfig(apiList)
      }
    },
    loadWXConfig (apiList, success = () => {}) {
      this.$post(
        JS_CONFIG, {
          url: window.location.href.split('#')[0]
        },
        resp => {
          if (window.wx && resp.data) {
            const data = resp.data
            window.wx.config({
              debug: false,
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.noncestr,
              signature: data.signature,
              jsApiList: apiList
            })
          }
        },
        error => {
          this.$toast(error)
        }
      )
    }
  }
}
