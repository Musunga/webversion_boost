<template>
  <div class="login-wechat-warp">
    <div class="logo">
      <img src="../../assets/imgs/logo.png" alt="">
    </div>
    <div class="login-content">
      <div class="login-title">申请获取以下权限</div>
      <div class="login-text">获得你的公开信息(昵称、头像、地区及性别)</div>
    </div>
    <div class="login-btn">
      <div class="btn" @click="onAuthCode">授权登录</div>
    </div>
  </div>
</template>

<script>
import { USER_INFO } from '../../apis/user.js'
import { mapState } from 'vuex'
import { getQueryString } from '../../utils/url.js'
export default {
  computed: {
    ...mapState(['user', 'cabinet', 'qrcode', 'zhcode']),
    url () {
      if (this.qrcode) {
        return `${window.location.origin}/#/?qrcode=${this.qrcode}`
      }
      if (this.zhcode) {
        return `${window.location.origin}/#/?zhcode=${this.zhcode}`
      }
      return `${window.location.origin}/#/`
    }
  },
  watch: {
    user (val, oldVal) {
      if (val) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    loadUser () {
      this.$loading(true)
      this.$get(
        USER_INFO,
        {},
        resp => {
          this.$loading(false)
          if (resp.user) {
            this.$store.commit('user', resp.user)
            this.$toast(this.i18n.msg_success_login)
          } else {
            this.$confirm({
              title: this.i18n.msg_fail_title,
              content: this.i18n.msg_fail_user
            }).then(() => {
              this.loadUser()
            }).catch(() => {
              this.$store.commit('token', null)
            })
          }
        },
        error => {
          this.$loading(false)
          this.$confirm({
            title: this.i18n.msg_fail_title,
            content: error
          }).then(() => {
            this.loadUser()
          }).catch(() => {
            this.$store.commit('token', null)
          })
          console.log(error)
        }
      )
    },
    onAuthCode () {
      this.$loading(true)
      this.$post(
        'authCodeUrl',
        {
          url: this.url
        },
        resp => {
          setTimeout(() => {
            this.$loading(false)
          }, 2000)
          window.location.href = resp.data
        },
        error => {
          this.$loading(false)
          this.$toast(this.i18n.msg_fail_logi)
          console.log(error)
        }
      )
    },
    loginMpByCode (code) {
      this.$loading(true)
      this.$post(
        'loginByCode',
        { code },
        resp => {
          this.$loading(false)
          if (resp.token) {
            this.$store.commit('token', resp.token)
            this.loadUser()
          } else {
            this.$toast(this.i18n.msg_fail_login)
          }
        },
        error => {
          this.$loading(false)
          this.$toast(this.i18n.msg_fail_login)
          console.log(error)
        }
      )
    }
  },
  created () {
    const code = getQueryString('code')
    if (code) {
      this.loginMpByCode(code)
    }
  }
}
</script>

<style lang="less">
.login-wechat-warp {
  height: 100vh;
  background-color: #fff;
  .logo {
    padding: 60px 0;
    img {
      display: block;
      margin: 0 auto;
    }
  }
  .login-content{
    border-top: 1px solid #dddddd;
    padding: 20px 10px;
    margin: 0 48px;
  }
  .login-title{
    color: #333333;
    font-size: 28px;
  }
  .login-text{
    color: #5F6368;
    font-size: 24px;
  }
  .login-btn {
    padding: 20px 96px;
  }
}
</style>
