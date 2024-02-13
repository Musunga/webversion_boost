<template>
  <div @click="onFacebook">
    <slot></slot>
  </div>
</template>

<script>
import { LOGIN_FACEBOOK } from '../../apis/user'
export default {
  methods: {
    onFacebook () {
      this.$loading(true)
      try {
        window.FB.login(
          (resp) => {
            console.log('resp', resp)
            if (resp.status === 'connected') {
              this.loginByFacebook({
                token: resp.authResponse.accessToken
              })
            } else {
              this.$loading(false)
            }
          },
          { scope: 'public_profile, email' }
        )
      } catch (error) {
        console.log(error)
        this.$loading(false)
      }
    },
    loginByFacebook (data) {
      this.$post(
        LOGIN_FACEBOOK,
        data,
        resp => {
          this.$loading(false)
          if (resp.token) {
            this.$store.commit('token', resp.token)
            this.$emit('success')
          } else {
            this.$toast('登录失败')
          }
        },
        error => {
          console.log(error)
          this.$loading(false)
          this.$toast('登录失败')
        }
      )
    },
    initFacebook () {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: process.env.VUE_APP_FB_APPID,
          cookie: true,
          xfbml: true,
          version: 'v5.0'
        })
        window.FB.AppEvents.logPageView()
      }
      this.loadFacebook(document, 'script', 'facebook-jssdk')
      // ( function (d, s, id) {
      //     let js = ''
      //     let fjs = d.getElementsByTagName(s)[0]
      //     if (d.getElementById(id)) {
      //       return
      //     }
      //     js = d.createElement(s)
      //     js.id = id
      //     js.src = 'https://connect.facebook.net/en_AU/sdk.js'
      //     fjs.parentNode.insertBefore(js, fjs)
      //   }
      // )(document, 'script', 'facebook-jssdk')
    },
    loadFacebook (d, s, id) {
      let js = ''
      let fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_AU/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }
  },
  mounted () {
    this.initFacebook()
  }
}
</script>
