<template>
  <page :title="i18n.title">
      <div class="login-warp">
      <div class="login-row">
        <input type="text" v-model="firstName" placeholder="First name">
      </div>
      <div class="login-row">
        <input type="text" v-model="lastName" placeholder="Last name">
      </div>
      <div class="login-row">
        <input type="email" v-model="email" placeholder="Email Address">
      </div>
      <div class="login-row">
        <div class="area" @click="isAreaView = true">
          <span>+{{areaCode}}</span>
          <div class="area-down"></div>
        </div>
        <input type="number" v-model="phone" placeholder="0000000">
      </div>

      <div class="login-info">
      </div>
      <div class="btn2 btn" @click="onRegister"><span>Create an Account</span></div>
      <select-area v-model="isAreaView" @select="onSelct"></select-area>
    </div>
  </page>

</template>

<script>
import {  REGISTER } from '../../apis/user'
import { mapState } from 'vuex'
import { SelectArea } from '../../components/select'
export default {
  components: {
    SelectArea
  },
  computed: {
    ...mapState(['user', 'browser']),
    i18n () {
      return this.$t('Register')
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
      email: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    onSelct (val) {
      this.areaCode = val
    },

    onRegister () {
      this.$loading(true)
      const headers = {
       'Content-Type': 'application/json'
      };

      const data = {
        mobile: '+' + this.areaCode + this.phone,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      };

      this.$post(
        REGISTER,
        data,
        res => {
          console.log(res)
          this.$loading(false)
          if (res) {
            this.$router.push('/login')
            this.$toast('Successfully Registered, Login now')
          } else {
            this.$toast(this.i18n.msg_fail_login)
          }
        },
        err => {
          console.log(err)
          this.$loading(false)
          this.$toast(err)
        },
        { headers }
      )
    },

  },
  created () {

  },
  mounted () {

  }
}
</script>

<style lang="less">
.login-warp {
  padding: 48px;
  background-color: #EFEFEF;
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
