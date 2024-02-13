<template>
  <div @click="onGoogle">
    <slot></slot>
  </div>
</template>

<script>
import { LOGIN_GOOGLE } from '../../apis/user'
let googleAuth2 = null
export default {
  data () {
    return {
      disabled: true
    }
  },
  methods: {
    onGoogle (googleUser) {
      if (this.disabled) {
        this.$toast('Loading...')
        return
      }
      this.$loading(true)
      googleAuth2.grantOfflineAccess().then(authResult => {
        if (authResult['code']) {
          this.loginByGoogle({ code: authResult['code'] })
        } else {
          // There was an error.
          this.$loading(false)
          this.$toast('登录失败')
        }
      }).catch(error => {
        console.log(error)
        this.$loading(false)
        this.$toast('登录失败')
      })
    },
    loginByGoogle (params) {
      this.$post(
        LOGIN_GOOGLE,
        params,
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
    initGoogle () {
      const vm = this
      window.initGoogle = () => {
        setTimeout(() => {
          console.log('load gapi', window.gapi)
          if (window.gapi) {
            window.gapi.load('auth2', function () {
              googleAuth2 = window.gapi.auth2.init({
                client_id: process.env.VUE_APP_GOOGLE_APPID,
                // Scopes to request in addition to 'profile' and 'email'
                scope: 'profile email'
              })
              vm.disabled = false
            })
          } else {
            window.initGoogle()
          }
        }, 300)
      }
      this.loadGoogle(document, 'script', 'google-jsplatform')
    },
    loadGoogle (d, s, id) {
      let js = ''
      let fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://apis.google.com/js/client:platform.js?onload=initGoogle'
      fjs.parentNode.insertBefore(js, fjs)
    }
  },
  mounted () {
    this.initGoogle()
  }
}
</script>
