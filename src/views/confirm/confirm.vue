<template>
  <page :title="i18n.title">
    <div class="confirm-warp">
      <div class="confirm-info">
        <!-- <div class="confirm-title">{{i18n.pay_label}}</div> -->
        <!-- <div class="confirm-price">{{currency}}{{payMode === 'creditcard' ? cabinet.yajin : price}}</div> -->
        <!-- <div class="confirm-icon">
          <img src="../../assets/imgs/icon_tips.png" />
          <span>{{i18n.price_tips}}</span>
        </div> -->
      </div>
      <div class="confirm-payment">
        <!-- <div class="confirm-payment-item" @click="payMode='paypal'">
          <div class="confirm-payment-item-info">
            <img src="../../assets/imgs/icon_paypal.png" />
            <div class="content">
              <div class="title">Paypal</div>
            </div>
          </div>
          <div class="confirm-payment-item-checked">
            <img v-if="payMode==='paypal'" src="../../assets/imgs/checkbox_selected.png" />
            <img v-else src="../../assets/imgs/checkbox.png" />
          </div>
        </div> -->
        <div v-if="system === 'ios'" class="confirm-payment-item" @click="payMode='applepay'">
          <div class="confirm-payment-item-info">
            <img src="../../assets/imgs/icon_applepay.png" />
            <div class="content">
              <div class="title">Apple Pay</div>
            </div>
          </div>
          <div class="confirm-payment-item-checked">
            <img v-if="payMode==='applepay'" src="../../assets/imgs/checkbox_selected.png" />
            <img v-else src="../../assets/imgs/checkbox.png" />
          </div>
        </div>
        <div v-if="system === 'android'" class="confirm-payment-item" @click="payMode='googlepay'">
          <div class="confirm-payment-item-info">
            <img src="../../assets/imgs/icon_googlepay.png" />
            <div class="content">
              <div class="title">Google Pay</div>
            </div>
          </div>
          <div class="confirm-payment-item-checked">
            <img v-if="payMode==='googlepay'" src="../../assets/imgs/checkbox_selected.png" />
            <img v-else src="../../assets/imgs/checkbox.png" />
          </div>
        </div>
        <!-- <div v-if="payType === 'YJ'" class="confirm-payment-item" @click="payMode='creditcard'">
          <div class="confirm-payment-item-info">
            <img src="../../assets/imgs/icon_creditcard.png" />
            <div class="content">
              <div class="title">Credit Card</div>
            </div>
          </div>
          <div class="confirm-payment-item-checked">
            <img v-if="payMode==='creditcard'" src="../../assets/imgs/checkbox_selected.png">
            <img v-else src="../../assets/imgs/checkbox.png">
          </div>
        </div> -->
        <div class="confirm-payment-item" @click="payMode='debitcard'">
          <div class="confirm-payment-item-info">
            <img src="../../assets/imgs/icon_creditcard.png" />
            <div class="content">
              <div class="title">Card Payment</div>
            </div>
          </div>
          <div class="confirm-payment-item-checked">
            <img v-if="payMode==='debitcard'" src="../../assets/imgs/checkbox_selected.png">
            <img v-else src="../../assets/imgs/checkbox.png">
          </div>
        </div>
        <div class="myCards" v-if="cardsList.length>0">
        <div v-for="card in cardsList" :key="card.pId">
          <div v-if="system === 'ios'" class="confirm-payment-item" @click="payMode='savedCard',selectedCard= card">
          <div class="confirm-payment-item-info">
            <img src="../../assets/imgs/icon_creditcard.png" />
            <div class="content">
              <div class="title">{{ card.pCardnumber }}</div>
            </div>
          </div>
          <div class="confirm-payment-item-checked">
            <img v-if="payMode==='savedCard'" src="../../assets/imgs/checkbox_selected.png" />
            <img v-else src="../../assets/imgs/checkbox.png" />
          </div>
        </div>
        </div>
      </div>
      </div>
      <div class="confirm-btns">
        <div class="btn" @click="onPay" :disabled="disabled">{{i18n.submit}}</div>
      </div>

      <popup-warp v-model="isCreditcard">
        <div>
          <div class="creditcard-input">
            <div id="credit-card-element"></div>
          </div>
          <div class="btn creditcard-btn" @click="onStripeSetup">Proceed</div>
        </div>
      </popup-warp>

      <popup-warp v-model="isDebitcard">
        <div>
          <div class="creditcard-input">
            <div id="debit-card-element"></div>
          </div>
          <!-- <div class="btn creditcard-btn" @click="onStripePay">Proceed</div> -->
          <div class="btn creditcard-btn" @click="onStripeSaveCard">Save Card</div>
        </div>
      </popup-warp>
    </div>
  </page>
</template>

<script>
import { mapState } from 'vuex'
import { getToken } from '../../utils/stripe_pay.js'
import {
  STRIPE_PRE_PAY,
  STRIPE_RECHARGE,
  PAYPAL_PRE_PAY,
  PAYPAL_RECHARGE,
  STRIPE_PAY_OF_CONFIRM,
  STRIPE_RECHARGE_OF_CONFIRM,
  STRIPE_PAY_CONFIRM,
  STRIPE_PREAUTH_OF_CONFIRM,
  STRIPE_SAVE_CARD_OF_INTENT,
  STRIPE_SAVE_CARD_CONFIRM,
  STRIPE_PRE_AUTH_WITH_CARD,
  STRIPE_PREAUTH_OF_CONFIRM1,
  STRIPE_PREAUTH_AUTO_CONFIRM,
  GET_SAVED_CARDS
} from '../../apis/payment'
import stripeMixin from '../../mixins/stripe'
import { PopupWarp } from '../../components/popup'
export default {
  mixins: [stripeMixin],
  components: {
    PopupWarp
  },
  computed: {
    ...mapState(['system', 'cabinet', 'user']),
    i18n () {
      return this.$t('confirm')
    },
    currency () {
      if (this.cabinet) {
        return this.cabinet.currencyName
      } else {
        return this.user.pcurrencyName
      }
    }
  },
  watch: {
    payMode (val, oldVal) {
      if (val === 'applepay' || val === 'googlepay') {
        if (!this.stripePayRequest) {
          this.disabled = true
          this.$loading(true)
          getToken(this.price, this.onStripe).then(data => {
            console.log('stripe getToken', data)
            this.stripePayRequest = data
            this.$loading(false)
          }).catch(error => {
            this.stripePayRequest = null
            console.log('stripe getToken', error)
            this.$loading(false)
            this.$confirm({
              title: this.i18n.msg_fail_title,
              content: this.i18n.msg_fail_support,
              showCancel: false,
              confirmText: this.i18n.msg_fail_confirm
            })
          })
        } else {
          this.disabled = false
        }
      } else {
        this.disabled = false
      }
    },
    stripePayRequest (val, oldVal) {
      this.disabled = !val
    }
  },
  data () {
    return {
      price: 0,
      payType: 'YJ',
      payMode: 'creditcard',
      disabled: false,
      stripePayRequest: null,
      isCreditcard: false,
      cardStyle: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      },
      creditcard: null,
      creditOrder: null,
      debitOrder: null,
      isDebitcard: false,
      debitcard: null,
      cardsList: null,
      selectedCard: null
    }
  },
  methods: {

    onStripe (token, ev) {
      let url = ''
      if (this.cabinet && this.payType === 'YJ') {
        url = `${STRIPE_PRE_PAY}/${this.cabinet.qrcode}`
      } else if (this.price > 0 && this.payType !== 'YJ') {
        url = STRIPE_RECHARGE
      } else {
        this.$confirm({
          title: this.i18nMsg.title,
          content: this.i18nMsg.error,
          confirmText: this.i18nMsg.confirm,
          showCancel: false
        }).then(() => {
          this.$router.push('/')
        })
      }
      this.$post(
        url,
        {
          stripeToken: token,
          amount: this.price
        },
        resp => {
          if (ev) {
            ev.complete('success')
          }
          this.$loading(false)
          console.log(resp)
          if (this.payType === 'CZ') {
            this.$confirm({
              title: this.i18nMsg.title,
              content: this.i18nMsg.success_payment,
              confirmText: this.i18nMsg.confirm,
              showCancel: false
            }).then(() => {
              this.$touter.push('/mine')
            })
          } else {
            this.$toast(this.i18nMsg.success_payment)
            this.$router.push(`/result?tradeNo=${resp.data}&payMode=stripe`)
          }
        },
        error => {
          if (ev) {
            ev.complete('fail')
          }
          this.$loading(false)
          console.log(error)
          this.$confirm({
            title: this.i18nMsg.title,
            content: this.i18nMsg.error,
            confirmText: this.i18nMsg.confirm,
            showCancel: false
          })
        }
      )
    },
    onPay () {
      if (this.payMode === 'paypal') {
        this.onPaypal()
      } else if (this.payMode === 'applepay' || this.payMode === 'googlepay') {
        this.stripePayRequest.show()
      } else if (this.payMode === 'creditcard') {
        this.onCreditcard()
      } else if (this.payMode === 'debitcard') {
        this.onDebitcard()
      } else if (this.payMode === 'savedCard') {
        this.preAuthWithCardByStripe()
      } else {
        this.$loading(true)
        setTimeout(() => {
          this.$loading(false)
          this.$router.push('/result')
        }, 3000)
      }
    },
    onCreditcard () {
      this.$loading(true)
      this.$post(
        `${STRIPE_PREAUTH_OF_CONFIRM1}/${this.cabinet.qrcode}`,
        {
          amount: this.price
          // paymentId: 3
        },
        resp => {
          this.$loading(false)
          console.log(resp)
          if (resp.data) {
            if (window.stripeElements) {
              this.creditOrder = resp.data
              this.loadStripeScript()
              this.creditcard = window.stripeElements.create('card', { style: this.cardStyle })
              this.creditcard.mount('#credit-card-element')
              this.$nextTick(() => {
                this.isCreditcard = true
              })
            } else {
              this.$toast('loading...')
            }
          }
        },
        error => {
          this.$loading(false)
          this.$confirm({
            title: this.i18n.msg_fail_title,
            content: this.i18n.msg_fail_order,
            confirmText: this.i18n.msg_fail_retry,
            cancelText: this.i18n.msg_fail_cancel
          }).then(() => {
            this.onCreditcard()
          })
          console.log(error)
        }
      )
    },
    onStripeSetup () {
      const vm = this
      vm.$loading(true)
      window.stripe.confirmCardSetup(vm.creditOrder.clientSecret, {
        payment_method: {
          card: vm.creditcard,
          billing_details: {
            name: 'test'
          }
        }
      }).then((result) => {
        console.log(result)
        vm.$loading(false)
        if (result.error) {
          vm.$toast(result.error.message)
        } else {
          vm.confirmSetup(result.setupIntent.id, result.setupIntent.payment_method)
        }
      })
    },
    confirmSetup (id, paymentMethod) {
      this.$loading(true)
      this.$post(
        STRIPE_PREAUTH_AUTO_CONFIRM,
        {
          paymentId: id,
          paymentMethod: paymentMethod
        },
        resp => {
          this.$loading(false)
          this.isCreditcard = false
          this.$router.push(`/result?tradeNo=${resp.data}&payMode=stripe`)
          console.log(resp)
        },
        error => {
          this.$loading(false)
          console.log(error)
        }
      )
    },

    getCardList () {
      var qrcode = ''
      var orderId = ''
      this.$get(
        `${GET_SAVED_CARDS}?qrcode=${this.cabinet.qrcode}&orderId=${orderId}`,
        {},
        resp => {
          console.log('CARDS :', resp.data)
          this.cardsList = resp.data
        },
        error => {
          console.log(error)
        }
      )
    },
    preAuthWithCardByStripe () {
      const vm = this
      vm.$loading(true)
      this.$post(
        `${STRIPE_PRE_AUTH_WITH_CARD}/${this.cabinet.qrcode}?cardId=${vm.selectedCard.pId}`,
        {},
        resp => {
          console.log(resp.data)
          if (resp.data) {
            this.$loading(false)
            this.isCreditcard = false
            this.isDebitcard = false
            if (this.payType === 'CZ') {
              this.$router.go(-2)
            } else if (this.cabinet) {
              this.$router.push(`/result?tradeNo=${resp.data.outTradeNo}&payMode=stripe`)
            }
            console.log(resp)
          }
        },
        error => {
          this.$loading(false)
          console.log(error)
          vm.$toast(error)
        }
      )
    },

    onStripePay () {
      const vm = this
      vm.$loading(true)
      window.stripe.handleCardPayment(vm.debitOrder.clientSecret, vm.debitcard).then((result) => {
        console.log('result', result)
        if (result.error) {
          vm.$loading(false)
          vm.$toast(result.error.message)
        } else {
          window.stripe.retrievePaymentIntent(vm.debitOrder.clientSecret).then((result) => {
            console.log('init result', result)
            vm.$loading(false)
            if (result.paymentIntent) {
              vm.confirmPay(result.paymentIntent.id)
            }
          })
        }
      })
    },

    // Save card to stripe
    onStripeSaveCard () {
      var paymentID = 3
      const vm = this

      vm.$loading(true)
      this.$post(
        `${STRIPE_SAVE_CARD_OF_INTENT}?paymentId=${paymentID}`,
        {},
        resp => {
          console.log(resp)
          console.log('clientSecret from debitOrder :', vm.debitOrder.clientSecret)
          console.log('clientSecret from saveCardOfIntent :', resp.data.clientSecret)
          if (resp.data) {
            window.stripe.confirmCardSetup(resp.data.clientSecret, {
              payment_method: {
                card: vm.debitcard
              }
            }).then((result) => {
              console.log('result', result)
              if (result.error) {
                vm.$loading(false)
                vm.$toast(result.error.message)
              } else {
                this.$post(
                  `${STRIPE_SAVE_CARD_CONFIRM}?paymentId=${paymentID}&paymentMethod=${resp.data.paymentId}`,
                  {},
                  resp => {
                    this.$loading(false)
                    console.log(resp)
                    if (resp.data) {

                    }
                  },
                  error => {
                    this.$loading(false)
                    console.log(error)
                  }
                )
              }
            })
          }
        },
        error => {
          this.$loading(false)
          console.log(error)
        }
      )
    },

    confirmPay (id) {
      this.$loading(true)
      this.$post(
        STRIPE_PAY_CONFIRM,
        {
          paymentId: id,
          outTradeNo: this.debitOrder.outTradeNo
        },
        resp => {
          this.$loading(false)
          this.isCreditcard = false
          if (this.payType === 'CZ') {
            this.$router.go(-2)
          } else if (this.cabinet) {
            this.$router.push(`/result?tradeNo=${resp.data}&payMode=stripe`)
          }
          console.log(resp)
        },
        error => {
          this.$loading(false)
          console.log(error)
        }
      )
    },

    onDebitcard () {
      this.$loading(true)
      let url = ''
      if (this.payType === 'CZ') {
        url = STRIPE_RECHARGE_OF_CONFIRM
      } else if (this.cabinet) {
        url = `${STRIPE_PAY_OF_CONFIRM}/${this.cabinet.qrcode}`
      }
      this.$post(
        url,
        {
          amount: this.price
        },
        resp => {
          this.$loading(false)
          console.log(resp)
          if (resp.data) {
            if (window.stripeElements) {
              this.debitOrder = resp.data
              this.loadStripeScript()
              this.debitcard = window.stripeElements.create('card', { style: this.cardStyle })
              this.debitcard.mount('#debit-card-element')
              this.$nextTick(() => {
                this.isDebitcard = true
              })
            } else {
              this.$toast('loading...')
            }
          }
        },
        error => {
          this.$loading(false)
          this.$confirm({
            title: this.i18n.msg_fail_title,
            content: this.i18n.msg_fail_order,
            confirmText: this.i18n.msg_fail_retry,
            cancelText: this.i18n.msg_fail_cancel
          }).then(() => {
            this.onDebitcard()
          })
          console.log(error)
        }
      )
    }
  },
  created () {
    let price = this.$route.query.price
    this.price = price ? Number(price) : 0
    this.payType = this.$route.query.payType
    this.loadStripeScript()
    this.getCardList()
    console.log(this.cabinet)
    console.log('Token from store:', this.$store.state.token)
  }
}
</script>

<style lang="less">
.confirm-warp {
  overflow-y: scroll;
}
.confirm-info {
  background: #ffffff;
  text-align: center;
  padding: 40px;
}
.confirm-title {
  font-size: 36px;
}
.confirm-price {
  font-size: 80px;
  color: #fc0d1b;
}
.confirm-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
  & span {
    text-align: left;
    font-size: 28px;
    color: #999999;
  }
}
.confirm-payment {
  background: #ffffff;
  padding: 30px;
  &-label {
    padding: 10px 20px;
    font-size: 28px;
    color: #999999;
  }
  &-item {
    display: flex;
    align-items: center;
    padding: 30px 20px;
    margin:5px;
    border-bottom: 1px solid #dddddd;
    & img {
      width: 40px;
      height: 40px;
    }
    &-info {
      display: flex;
      align-items: center;
      flex: 1;
      & .content {
        padding-left: 10px;
      }
      & .sub_title {
        font-size: 28px;
        color: #fec348;
      }
    }
  }
}
.confirm-remark {
  padding: 0 32px;
}
.confirm-remark .title {
  margin-top: 40px;
  font-size: 32px;
}
.confirm-remark .desc {
  font-size: 28px;
  color: rgba(102, 102, 102, 1);
  font-weight: 400;
  word-break: normal !important;
  white-space: normal !important;
}
.confirm-btns {
  padding: 60px 40px 20px;
}
.confirm-btns .btn {
  margin-top: 20px;
}
/* #ifdef MP-WEIXIN */
.confirm-btns button.btn {
  background-color: #65b74e;
}
/* #endif */
.confirm-checkbox {
  padding: 30px;
  & label {
    display: flex;
    align-items: center;
  }
  & span {
    color: #52ac7a;
  }
}
.btn-paypal {
  background: #fec348 !important;
}
.btn-paypal img {
  width: 277px;
  height: 60px;
  margin: 18px 0;
}
.btn-applepay {
  background: #ffffff !important;
  color: #050608;
}
.btn-applepay img {
  width: 143px;
  height: 60px;
  margin: 18px 0;
}
.btn-googlepay {
  color: #5f6368;
  background: #ffffff !important;
}
.btn-googlepay img {
  width: 145px;
  height: 60px;
  margin: 18px 0;
}
.creditcard-input {
  margin: 48px 48px 200px;
  padding: 20px;
  border-radius: 20px;
  border: 1Px solid #E4E7ED;
}
.creditcard-btn {
  margin: 48px;
}
</style>
