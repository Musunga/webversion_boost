var alipayscript
export default {
  methods: {
    loadAlipayScript () {
      if (!alipayscript) {
        alipayscript = window.document.createElement('script')
        alipayscript.src = 'https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js'
        // alipayscript.onload = () => {
        //   this.loadWXConfig(apiList)
        // }
        var head = window.document.head || window.document.getElementsByTagName('head')[0] || window.document.documentElement
        head.insertBefore(alipayscript, head.firstChild)
      }
    }
    // loadWXConfig (apiList, success = () => {}) {
    //   this.$post(
    //     JS_CONFIG, {
    //       url: window.location.href.split('#')[0]
    //     },
    //     resp => {
    //       if (window.wx && resp.data) {
    //         const data = resp.data
    //         window.wx.config({
    //           debug: false,
    //           appId: data.appId,
    //           timestamp: data.timestamp,
    //           nonceStr: data.noncestr,
    //           signature: data.signature,
    //           jsApiList: apiList
    //         })
    //       }
    //     },
    //     error => {
    //       this.$toast(error)
    //     }
    //   )
    // }
  }
}
