<template>
  <page :title="i18n.wallet" :showBack="false">
    <div class="wallet-balance">
      <div class="wallet-balance-warp">
        <div class="wallet-balance-label">{{i18n.balance}}</div>
        <div class="wallet-balance-value">{{user && user.pcurrencyName}}{{user && user.pbalance || 0}}</div>
        <div class="wallet-balance-label">{{i18n.deposit}}: {{user.pyajin}}</div>
      </div>
      <div class="wallet-balance-more">
        <img src="../../assets/imgs/wallet_more.png">
      </div>
    </div>
    <div class="wallet-btn">
      <div @click="goRouter('/wallet_in')">
        <img src="../../assets/imgs/wallet_pull.png">
        <span>{{i18n.wallet_in}}</span>
      </div>
      <div @click="goRouter('/wallet_out')">
        <img src="../../assets/imgs/wallet_push.png">
        <span>{{i18n.wallet_out}}</span>
      </div>
    </div>
  </page>
</template>

<script>
import { USER_INFO } from '../../apis/user.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user']),
    i18n () {
      return this.$t('mine')
    },
    i18nMsg () {
      return this.$t('msg')
    }
  },
  methods: {
    loadUser () {
      this.$get(
        USER_INFO,
        {},
        resp => {
          if (resp.user) {
            this.$store.commit('user', resp.user)
          } else {
            this.$confirm({
              title: this.i18n.msg_fail_title,
              content: this.i18n.msg_fail_user,
              confirmText: this.i18nMsg.retry,
              cancelText: this.i18nMsg.cancel
            }).then(() => {
              this.loadUser()
            })
          }
        },
        error => {
          this.$confirm({
            title: this.i18n.msg_fail_title,
            content: this.i18nMsg.error,
            confirmText: this.i18nMsg.retry,
            cancelText: this.i18nMsg.cancel
          }).then(() => {
            this.loadUser()
          })
          console.log(error)
        }
      )
    },
    goRouter (path) {
      this.$router.push(path)
    }
  },
  created () {
    this.loadUser()
  }
}
</script>

<style lang="less">
.wallet-balance{
  margin: 40px;
  background: linear-gradient(90deg,#EBD460 0%,#E5BE53 100%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 40px 60px 20px;
  color: #333333;
  display: flex;
  align-items: center;
  &-warp{
    flex: 1;
  }
  &-label{
    font-size: 32px;
  }
  &-value{
    font-size: 70px;
    font-weight: bold;
  }
  &-more{
    & img{
      width: 20px;
      height: 30px;
      display: block;
    }
  }
}
.wallet-btn{
  display: flex;
  padding: 20px 40px;
  & div{
    flex: 1;
    height: 72px;
    line-height: 72px;
    border-radius: 10px;
    text-align: center;
    border: 2px solid #333333;
    font-size: 28px;
    font-weight: 500;
    color: #333333;
    margin: 0 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & img{
    width: 40px;
    height: 40px;
    display: block;
  }
  & span{
    padding-left: 15px;
  }
}
</style>
