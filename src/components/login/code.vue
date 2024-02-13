<template>
  <page>
    <div slot="head" class="page-head-default">
      <img src="../../assets/imgs/back.png" alt="" @click="onBack">
      {{i18n.code_title}}
    </div>
    <div class="login-code-warp">
      <div class="top-tips">{{i18n.verification_code}}</div>
      <div class="code-input-main" @click="onFocus">
        <div class="code-input-main-item">{{code[0]}}<div class="item-cursor" v-if="isFocus&&code.length===0"></div></div>
        <div class="code-input-main-item">{{code[1]}}<div class="item-cursor" v-if="isFocus&&code.length===1"></div></div>
        <div class="code-input-main-item">{{code[2]}}<div class="item-cursor" v-if="isFocus&&code.length===2"></div></div>
        <div class="code-input-main-item">{{code[3]}}<div class="item-cursor" v-if="isFocus&&code.length>=3" :class="{'end': code.length===4}" ></div></div>
        <input id="codeinput" class="code-input-input" v-model="code" maxlength="4" type="number" @blur="onBlur"/>
      </div>
      <div class="login-code-btn">
        <div class="btn" @click="onSubmit">{{i18n.login}}</div>
      </div>
      <div class="remark">
        {{i18n.no_sms}}<br />
        <span class="again" @click="onAgain">{{i18n.retry}}</span>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  computed: {
    i18n () {
      return this.$t('login')
    }
    // loginDisabled () {
    //   return this.code.length !== 4
    // }
  },
  watch: {
    isFocus (val, oldVal) {
      if (!val) {
        this.inputStatus = false
      }
    },
    code (val, oldVal) {
      if (val.length > 4) {
        this.code = val.slice(0, 4)
      }
    }
  },
  data () {
    return {
      code: '',
      isFocus: false,
      inputStatus: false
    }
  },
  methods: {
    onFocus () {
      let node = document.getElementById('codeinput')
      node.focus()
      this.isFocus = true
    },
    onBlur () {
      this.isFocus = false
    },
    onSubmit () {
      this.$emit('submit', this.code)
    },
    onAgain () {
      this.$emit('again')
    },
    onBack () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="less">
@keyframes blink {
  0% {
    background-color: #161616;
  }
  50% {
    background-color: rgba(0, 0, 0, 0);
  }
  100% {
    background-color: #161616;
  }
}
.page-head-default{
  background-color: #FFFF;
  color:#161616;
}
.login-code-warp {
  color: #161616;
  font-size: 28px;
  background-color: #EFEFEF;
  padding: 0 55px;
  position: fixed;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  .top-tips {
    padding: 60px 0 200px;
    text-align: center;
    line-height: 40px;
  }
  .code-input-input {
    height: 1px;
    width: 1px;
    text-align: center;
    position: absolute;
    left: -100px;
    bottom: 0;
    font-size: 10px;
    caret-color: transparent;
    color: transparent;
    z-index: -999;
  }
  .code-input-main {
    height: 180px;
    line-height: 180px;
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .code-input-main-item {
    width: 100px;
    flex: 1;
    margin: 0 20px;
    background-color: #ffff;
    border-bottom: 1px solid #ffff;
    text-align: center;
    font-size: 100px;
    display: flex;
    border-radius: 15px;
    border:1px;
    justify-content: center;
    align-items: center;
    position: relative;
    .item-cursor {
      width: 1px;
      height: 100px;
      background-color: #161616;
      animation: blink 1s infinite steps(1, start);
    }
    .end {
      position: absolute;
      right: 0;
    }
  }
  .login-code-btn {
    padding-top: 60px;

  }
  .remark {
    padding-top: 20px;
    line-height: 40px;
    text-align: center;
    .again {
      display: inline-block;
      font-weight: 500;
      border-bottom: 1px solid #161616;
    }
  }
}
</style>
