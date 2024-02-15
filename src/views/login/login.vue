<template>
  <div class="login-warp">
    <div class="logo">
      <img src="../../assets/imgs/boost.svg" alt="">
    </div>
    <div>
      <login-google @success="loadUser">
      <div class="row btn">
        <div class="col social"> <img src="../../assets/imgs/icon_google.png" alt=""></div>
        <div class="col ">
          Sign in with Google
        </div>
      </div>
    </login-google>
    </div>

      <login-facebook @success="loadUser">
      <div class="row btn">
        <div class="col social"> <img src="../../assets/imgs/icon_facebook.png" alt=""></div>
        <div class="col ">
          Sign in with Facebook
        </div>
      </div>
    </login-facebook>

    <div class="login-row">
      <div class="area" @click="isAreaView = true">
        <span>+{{areaCode}}</span>
        <div class="area-down"></div>
      </div>
      <input type="number" v-model="phone" :placeholder="i18n.phone_number">
    </div>
    <!-- <div class="login-row">
      <input type="number" v-model="code" :placeholder="i18n.captcha_code">
      <div class="login-code" @click="onCaptcha">
        <img :src="captchaUrl" />
      </div>
    </div> -->
    <div class="login-info">
      <span>{{i18n.agree}}
        <span class="readme" @click="onReadMe">{{i18n.readme}}</span>
      </span>
    </div>
    <div class="btn2 btn" @click="onSendCode"><span>{{i18n.login}}</span></div>
    <div class="btn2 btn" @click="onRegister"><span> Register</span></div>

    <select-area v-model="isAreaView" @select="onSelct"></select-area>
    <login-code v-if="isLoginCode" @submit="onLogin" @again="onBack" @back="onBack"></login-code>
  </div>
</template>

<script>
import { SelectArea } from '../../components/select'
import { generateUUID } from '../../utils/index'
import { baseURL } from '../../utils/http'
import { USER_CAPTCHA, LOGIN_CODE, SEND_CODE, USER_INFO } from '../../apis/user'
import { LoginCode, LoginFacebook, LoginGoogle } from '../../components/login'
import { mapState } from 'vuex'
export default {
  components: {
    SelectArea,
    LoginCode,
    LoginFacebook,
    LoginGoogle
  },
  computed: {
    ...mapState(['user', 'browser']),
    i18n () {
      return this.$t('login')
    }
  },
  watch: {
    user (val, oldVal) {
      if (val && !oldVal) {
        this.$router.push('/')
      }
    }
  },
  data () {
    return {
      isAreaView: false,
      areaCode: '971',
      phone: '',
      code: '',
      captchaUrl: '',
      uuid: '',
      isLoginCode: false
    }
  },
  methods: {
    onReadMe () {
      window.open(process.env.VUE_APP_PACT)
    },

    onSelct (val) {
      this.areaCode = val
    },
    onRegister () {
      this.$router.push('/register')
    },
    onCaptcha () {
      this.code = ''
      this.uuid = generateUUID()
      this.captchaUrl = `${baseURL}${USER_CAPTCHA}?uuid=${this.uuid}`
    },
    onLogin (code) {
      this.$loading(true)
      this.$post(
        LOGIN_CODE,
        {
          mobile: this.areaCode + this.phone,
          verifyCode: code
        },
        res => {
          console.log(res)
          this.$loading(false)
          if (res.token) {
            this.$store.commit('token', res.token)
            this.loadUser()
          } else {
            this.$toast(this.i18n.msg_fail_login)
          }
        },
        err => {
          console.log(err)
          this.$loading(false)
        }
      )
    },
    onSendCode () {
      this.$loading(true)
      this.$get(
        SEND_CODE + this.areaCode + this.phone,
        {},
        res => {
          console.log(res)
          this.$loading(false)
          this.isLoginCode = true
        },
        err => {
          console.log(err)
          this.$loading(false)
          this.$toast(err)
        }
      )
    },
    onBack () {
      this.isLoginCode = false
      this.onCaptcha()
    },
    loadUser () {
      this.$loading(true)
      this.$get(
        USER_INFO,
        {},
        res => {
          this.$loading(false)
          if (res.user) {
            this.$store.commit('user', res.user)
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
        err => {
          this.$loading(false)
          this.$confirm({
            title: this.i18n.msg_fail_title,
            content: err,
            showCancel: false
          }).then(() => {
            this.$store.commit('token', null)
          })
        }
      )
    }
  },
  created () {
    if (this.browser === 'wechat') {
      this.$router.push('/login_wechat')
    } else if (this.browser === 'alipay') {
      this.$router.push('/login_alipay')
    }
  },

  mounted () {
    this.onCaptcha()
  }
}
</script>

<style lang="less">
.login-warp {
  height: 100vh;
  background-color: #EFEFEF;
  .logo {
    padding: 100px 0 40px 0;
    img {
      display: block;
      margin: 0 auto;
      width: 250px;
    }
  }
  .login-row {
    margin: 36px 96px;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // border-bottom: 4px solid #000;
    .area {
      width: 100px;
      padding: 0 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    input {
      font-size: 32px;
      width: 300px;
      flex: 1;
      height: 80px;
      padding: 0 20px;
      margin: 0;
      border: 1px;
      border-radius: 15px;
      outline: none;
      background-color: rgba(255, 255, 255, 1);
    }
    .area-down {
      // margin-left: 10px;
      width: 0;
      height: 0;
      border-width: 10px 10px 0;
      border-style: solid;
      border-color: black transparent transparent;
    }
    .login-code {
      width: 180px;
      height: 60px;
      background-image: linear-gradient(to right, rgba(194, 194, 194, 1), rgba(252, 252, 252, 1));
      img {
        width: 180px;
        height: 60px;
      }
    }
  }
  .btn {
    margin: 60px 96px 0;
    border-radius: 15px;
    border: 1px;
    background-color: #ffff;
    color: #383838;
  }
  .btn1 {
    margin: 60px 96px 0;
    border-radius: 15px;
    border: 1px;
    background-color: #383838;
  }
  .btn2 {
    margin: 60px 96px 0;
    border-radius: 15px;
    border: 1px;
    color: #ffff;
    background-color: #383838;
  }
  .login-foot {
    // position: fixed;
    // left: 96px;
    // right: 96px;
    // bottom: 48px;
    &-tips {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      span {
        z-index: 999;
        background: #fff;
        padding: 28px;
      }
      &::after {
        position: absolute;
        content: ' ';
        height: 1Px;
        width: 100%;
        background-color: #000;
        z-index: 99;
      }
    }
    &-imgs {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #E4E7ED;
        margin: 0 24px;
      }
    }
  }
  .social{
    display: flex;
      justify-content: center;
      align-items: center;
    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        // background-color: #E4E7ED;
        margin: 0 24px;
      }
  }
  .login-info {
    font-size: 24px;
    font-weight: 400;
    color: rgba(153,153,153,1);
    line-height: 33px;
    display: flex;
    justify-content: flex-start;
    padding: 0 96px;
  }
  .login-info .readme {
    font-weight: 500;
    color: rgba(52,125,255,1);
    margin-left: 10px;
    display: inline;
  }
}
</style>
