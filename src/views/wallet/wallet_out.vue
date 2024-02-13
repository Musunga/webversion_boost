<template>
  <page :title="i18n.title">
    <div>
      <div class="wallet-form">
        <div class="wallet-label">{{i18n.price_label}}</div>
        <div class="wallet-input">
          <span>{{user && user.pcurrencyName}}</span>
          <input type="number" v-model="price" :placeholder="i18n.price_placeholder" />
        </div>
      </div>
      <div class="wallet-balance">
        {{i18n.balance}}:<span class="price">{{user && user.pcurrencyName}}{{user && user.pbalance || 0}}</span>
        <span @click="onAll">{{i18n.balance_all}}</span>
      </div>
      <div class="wallet-deposit" v-if="user && Number(user.pyajin)>0">
        <div>{{i18n.deposit}}:<span>{{user && user.pcurrencyName}}{{user && user.pyajin || 0}}</span></div>
        <span class="tag">{{deposiTips}}</span>
      </div>
      <div class="wallet-btn">
        <button class="btn" @click="onSubmit">{{i18n.apply}}</button>
      </div>
    </div>
  </page>
</template>

<script>
import { TX_APPLY, TX_POST } from '../../apis/user.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user', 'browser']),
    i18n () {
      return this.$t('wallet_out')
    },
    deposiTips () {
      return `${this.i18n.deposit_tips}`.format(this.user)
    }
  },
  data () {
    return {
      price: 0
    }
  },
  methods: {
    onAll () {
      if (this.user && this.user.pbalance) {
        this.price = this.user.pbalance
      }
    },
    onSubmit () {
      if (isNaN(this.price) || this.price <= 0) {
        this.$toast(this.i18n.msg_fail_price)
      } else if (this.price > this.user.pbalance) {
        this.$toast(this.i18n.msg_fail_balance)
      } else {
        this.$loading(true)
        let url = TX_APPLY
        let param = {
          amount: this.price
        }
        if (this.browser) {
          url = `${TX_POST}/${this.price}/all`
          param = {}
        }
        this.$post(
          url,
          {
            ...param
          },
          resp => {
            this.$loading(false)
            this.$toast(this.i18n.msg_success_content)
            this.$store.commit('user', {
              ...this.user,
              pbalance: this.user.pbalance - this.price
            })
            this.price = 0
            console.log(resp)
          },
          error => {
            this.$loading(false)
            this.$confirm({
              title: this.i18n.msg_title,
              content: error,
              showCancel: false,
              confirmText: this.i18n.confirm
            })
          }
        )
      }
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
  color: rgba(51,51,51,1);
}
.wallet-input{
  padding: 20px 0;
  display: flex;
  align-items: center;
  font-size: 56px;
  font-weight: 500;
  color: #333333;
}
.wallet-input span{
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
  border-top: 1px solid rgba(217,217,217,1);
  font-size: 32px;
  font-weight: 400;
  color: rgba(51,51,51,1);
  padding: 26px 40px;
  display: flex;
  align-items: center;
}
.wallet-balance span{
  font-size: 30px;
  font-weight: 400;
  color: #E5BE53;
}
.wallet-balance span.price{
  flex: 1;
  font-size: 36px;
  font-weight: 500;
  color: rgba(241,52,52,1);
}
.wallet-deposit{
  background: #FFFFFF;
  margin-top: 20px;
  padding: 26px 40px;
}
.wallet-btn{
  padding: 55px;
  button {
    width: 100%;
    border: none;
    padding: 0;
    margin: 0;
  }
}
</style>
