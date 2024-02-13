<template>
  <page :title="i18n.title">
    <div class="wallet-in-warp">
      <div class="wallet-form">
        <div class="wallet-label">{{i18n.price_label}}</div>
        <div class="wallet-input">
          <span class="wallet-input-tips">{{user && user.pcurrencyName}}</span>
          <input type="number" v-model="price" :placeholder="i18n.price_placeholder" readonly="readonly" />
        </div>
      </div>
      <div class="wallet-balance">
        {{i18n.balance}}:<span>{{user && user.pcurrencyName}} {{user && user.pbalance || 0}}</span>
      </div>
      <div class="wallet-in-prices-warp">
        <div class="wallet-in-label">{{i18n.price_auto}}</div>
        <div class="wallet-in-prices">
          <div class="wallet-in-price" v-for="(item, i) in prices" :key="i" @click="onItem(item)">
            <div :class="{'active': `${item}`===`${price}`}">{{user && user.pcurrencyName}} {{item}}</div>
          </div>
        </div>
        <span class="tag">{{i18n.price_tips}}</span>
      </div>
      <div class="wallet-btn">
        <button class="btn" @click="onSubmit">{{i18n.submit}}</button>
      </div>
    </div>
  </page>
</template>

<script>
import { WECHAT_MP_RECHARGE } from '../../apis/payment.js'
import { mapState } from 'vuex'
import wxMixin from '../../mixins/wx.js'
export default {
  computed: {
    ...mapState(['user', 'browser']),
    i18n () {
      return this.$t('wallet_in')
    },
    i18nMsg () {
      return this.$t('msg')
    }
  },
  mixins: [wxMixin],
  data () {
    return {
      price: 10,
      prices: [10, 20, 50, 100, 200, 500]
    }
  },
  methods: {
    onItem (price) {
      this.price = price
    },
    onSubmit (event) {
      const vm = this
      if (this.browser === 'wechat') {
        this.$loading(true)
        console.log('event', event)
        this.$post(
          WECHAT_MP_RECHARGE,
          {
            amount: this.price,
            formId: event.detail.formId || ''
          },
          resp => {
            this.$loading(false)
            console.log('wechat recharge', resp)
            const data = resp.data
            wx.chooseWXPay({
              timestamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.package,
              signType: data.signType,
              paySign: data.paySign,
              success: function (res) {
                vm.$confirm({
                  title: vm.i18nMsg.title,
                  content: vm.i18nMsg.success_payment,
                  showCancel: false,
                  confirmText: vm.i18nMsg.confirm
                })
                vm.$store.commit('user', {
                  ...vm.user,
                  pbalance: vm.user.pbalance + vm.price
                })
              },
              fail: function (res) {
                console.log('wxpay fail', res)
                vm.$confirm({
                  title: vm.i18nMsg.title,
                  content: JSON.stringify(res),
                  showCancel: false,
                  confirmText: vm.i18nMsg.confirm
                })
                vm.$toast(res.errMsg)
              }
            })
          },
          error => {
            console.log('wechat pre pay error', error)
            vm.$loading(false)
            vm.$toast(error)
          }
        )
      } else {
        this.$router.push(`/confirm?price=${this.price}&payType=CZ`)
      }
    }
  },
  created () {
    if (this.browser === 'wechat') {
      this.loadWXScript(['chooseWXPay'])
    }
  }
}
</script>

<style lang="less">
.wallet-form{
  background: #FFFFFF;
  padding: 40px 40px 0;
}
.wallet-label{
  font-size: 32px;
  font-weight: 400;
  color: #333333;
}
.wallet-input{
  padding: 20px 0;
  display: flex;
  align-items: center;
  font-size: 56px;
  font-weight: 500;
  color: #333333;
}
.wallet-input-tips{
  height: 78px;
  line-height: 78px;
}
.wallet-input input{
  width: 300px;
  flex: 1;
  height: 78px;
  line-height: 78px;
  padding: 0 20px;
  color: #333333;
  font-size: 64px;
  border-radius: 20px;
  border: 1Px solid #E4E7ED;
}
.wallet-balance{
  background: #FFFFFF;
  border-top: 1Px solid rgba(217,217,217,1);
  font-size: 32px;
  font-weight: 400;
  color: rgba(51,51,51,1);
  padding: 26px 40px;
}
.wallet-balance span{
  font-size: 36px;
  font-weight: 500;
  color: rgba(241,52,52,1);
}
.wallet-in-prices-warp{
  margin-top: 20px;
  background: #FFFFFF;
  padding: 26px 40px;
  font-size: 32px;
  font-weight: 400;
  color: rgba(51,51,51,1);
}
.wallet-in-prices{
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.wallet-in-price{
  padding: 20px 17px 0 0;
  & div.active{
    background: #E5BE53;
    color: #FFFFFF;
  }
}
.wallet-in-price:nth-of-type(3n+0) {
  padding-right: 0;
}
.wallet-in-price div{
  width: 208px;
  height: 80px;
  line-height: 80px;
  border-radius: 10px;
  border: 1Px solid #E4E7ED;
  font-size: 28px;
  font-weight: 400;
  color: #333333;
  text-align: center;
}
.wallet-btn {
  padding: 55px;
  button {
    width: 100%;
    border: none;
    padding: 0;
    margin: 0;
  }
}
</style>
