<template>
  <page :title="i18n.title">
    <div v-if="second>0" class="result-loading-warp">
      <div class="result-loading circle">
        <circle-progress v-model="percent" />
        <span>{{secondFmt}}s</span>
      </div>
      <div class="result-loading-tips">
        {{i18n.msg_tips_loading}}
      </div>
    </div>
    <div v-else-if="order">
      <div class="result-modal-head">
        <img src="../../assets/imgs/success.png">
        <div>{{i18n.msg_success}}</div>
      </div>
      <div class="result-modal-warp">
        <div class="result-modal-cabinet">
          <svg xmlns="http://www.w3.org/2000/svg" width="622.731" height="753.839" viewBox="0 0 622.731 753.839">
            <path id="Path_339" data-name="Path 339" d="M1680.057,1211.493H1174.588c-46.279,0-67.1-57.968-31.406-87.419l56.574-46.673a49.355,49.355,0,0,1,31.406-11.282h387.919a49.351,49.351,0,0,1,30,10.162l60.976,46.672C1747.52,1151.631,1727.24,1211.493,1680.057,1211.493Z" transform="translate(-1125.139 -671.686)"/>
            <path id="Path_340" data-name="Path 340" d="M1125.139,1156.584v208.47a60.471,60.471,0,0,0,60.47,60.471h483.365a60.472,60.472,0,0,0,60.471-60.531l-.208-208.41Z" transform="translate(-1125.139 -671.686)"/>
            <path id="Path_341" data-name="Path 341" d="M1566.008,1127.059h-287.6c-15.225,0-21.974-14.15-10.112-21.2l15.784-9.381a19.969,19.969,0,0,1,10.112-2.632h258.643a19.5,19.5,0,0,1,11.2,3.338l13.17,9.381C1587.651,1114.007,1580.52,1127.059,1566.008,1127.059Z" transform="translate(-1125.139 -671.686)" fill="#383838"/>
            <rect id="Rectangle_153" data-name="Rectangle 153" width="262.837" height="33.213" transform="translate(167.602 422.16)" fill="#191919"/>
            <path id="Path_342" data-name="Path 342" d="M1417.98,1080.887l-75.491-31.627a39.554,39.554,0,0,1-21.2-51.766l90.228-215.37a40.774,40.774,0,0,1,42.326-24.745l31.963,3.723c20.148,8.441,78.884,71.132,70.443,91.281L1489.4,1066.94l-4.987,4.12A64.926,64.926,0,0,1,1417.98,1080.887Z" transform="translate(-1125.139 -671.686)" fill="#00cdfc"/>
            <rect id="Rectangle_154" data-name="Rectangle 154" width="160.638" height="303.739" rx="39.554" transform="matrix(0.922, 0.386, -0.386, 0.922, 328.068, 75.527)" fill="#202024"/>
            <g id="Group_164" data-name="Group 164" transform="translate(-1125.139 -671.686)">
              <path id="Path_343" data-name="Path 343" d="M1504.049,794.9l-5.157-2.16-17.251,41.176,5.157,2.161,7.283-17.385,32.853,13.764,2.654-6.335-32.853-13.763Zm-14.855,50.752.737-6.1-.811-.339q-4.764-2-7.356-.7t-4.628,6.157l-8.486,20.257q-2.13,5.084-1.075,7.733t6.358,4.872l3.315,1.388q5.23,2.191,7.895,1.1t4.8-6.174l10-23.866,11.417,4.783L1499.5,883.05l-6.114-2.562-1.069,6.48,1.031.432q5.23,2.191,7.895,1.1t4.826-6.247l9.289-22.172q2.158-5.156,1.053-7.785t-6.337-4.82l-4.272-1.79q-5.156-2.159-7.843-1.121t-4.847,6.2l-10.03,23.94-10.681-4.475,11.264-26.886Zm-39.255,153.225a4.849,4.849,0,0,1-.416,3.68l-9.2,21.951-12.228-5.123,9.2-21.951a4.852,4.852,0,0,1,2.331-2.877q1.344-.519,3.995.591l3.168,1.327q2.579,1.082,3.15,2.4m-17.579-3.511-9.2,21.951-10.533-4.413,9.2-21.951a5.648,5.648,0,0,1,1.913-2.7q1.048-.644,3.038.19l3.83,1.6q3.388,1.419,1.753,5.323m22.4,9.362q4.406-10.514-3.035-13.631l-4.862-2.037q-6.629-2.776-10.155,3.366,1.813-6.6-3.859-8.977l-4.42-1.852q-3.9-1.635-6.436-.449t-4.288,5.377l-12.813,30.585,38.01,15.924Z" fill="#494949"/>
              <path id="Path_344" data-name="Path 344" d="M1474,970.179l-5.314-2.227a18.69,18.69,0,1,1-10.207-24.926l2.226-5.313a24.45,24.45,0,1,0,13.3,32.466" fill="#00cdfc"/>
              <path id="Path_345" data-name="Path 345" d="M1450.922,898.687l5.314,2.226a18.69,18.69,0,1,1,10.206,24.927l-2.226,5.313a24.451,24.451,0,1,0-13.294-32.466" fill="#00cdfc"/>
            </g>
            <path id="Path_346" data-name="Path 346" d="M1392.377,750.066a82.638,82.638,0,0,1-71.25-71.25h0a82.639,82.639,0,0,1-71.25,71.25h0a82.639,82.639,0,0,1,71.25,71.25h0a82.639,82.639,0,0,1,71.25-71.25Z" transform="translate(-1125.139 -671.686)" fill="#fff"/>
            <path id="Path_347" data-name="Path 347" d="M1281.331,692.6a24.257,24.257,0,0,1-20.914-20.914h0A24.256,24.256,0,0,1,1239.5,692.6h0a24.257,24.257,0,0,1,20.914,20.914h0a24.257,24.257,0,0,1,20.914-20.914Z" transform="translate(-1125.139 -671.686)" fill="#00cdfc"/>
            <path id="Path_348" data-name="Path 348" d="M1747.87,958.364a64.352,64.352,0,0,1-55.483-55.483h0a64.354,64.354,0,0,1-55.483,55.483h0a64.352,64.352,0,0,1,55.483,55.483h0a64.351,64.351,0,0,1,55.483-55.483Z" transform="translate(-1125.139 -671.686)" fill="#00cdfc"/>
            <path id="Path_349" data-name="Path 349" d="M1289.147,1028.42,1173.2,724.96l-20.54,37.1Z" transform="translate(-1125.139 -671.686)" fill="#00cdfc"/>
            <path id="Path_350" data-name="Path 350" d="M1271.258,1028.42,1169.221,902.88l-16.564,22.178Z" transform="translate(-1125.139 -671.686)" fill="#fff"/>
            <path id="Path_351" data-name="Path 351" d="M1555.578,1013.847,1636.9,884.008l7.385,18.872Z" transform="translate(-1125.139 -671.686)" fill="#00cdfc"/>
            <path id="Path_352" data-name="Path 352" d="M1576.043,1028.42l68.245-43.562v24.593Z" transform="translate(-1125.139 -671.686)" fill="#00cdfc"/>
            <path id="Path_353" data-name="Path 353" d="M1593.27,902.88l111.975-224.064,9.276,13.784Z" transform="translate(-1125.139 -671.686)" fill="#fff"/>
          </svg>

        </div>
        <div class="result-modal-remark">
          <div>{{i18n.return_info}}</div>
        </div>
      </div>
    </div>
    <!-- <result-msg v-else-if="loading" type="100" :text="i18n.msg_result_loading" />
    <result-msg v-else-if="error" type="500" :text="error" @click="onReload" />
    <result-msg v-else /> -->
  </page>
</template>

<script>
import CircleProgress from '../../components/result/circle_progress.vue'
import ResultMsg from '../../components/result/msg.vue'
import { ORDER_CHECK } from '../../apis/cabinet.js'
let loadingTimer
export default {
  components: {
    // ResultMsg,
    CircleProgress
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {

  },
  computed: {
    i18n () {
      return this.$t('result')
    },
    i18nMsg () {
      return this.$t('msg')
    },
    percent () {
      return (this.second % 30) * 3.334
    },
    secondFmt () {
      return (this.second + 0.45).toFixed(0)
    },
    shopDesc () {
      return `${this.i18n.price_info}`.format(this.order)
    },
    infoTips1 () {
      return `${this.i18n.tips_1}`.format(this.order)
    },
    infoTips2 () {
      return this.i18n.tips_2
    },
    imgSrc () {
      if (this.order) {
        return require(`../../assets/imgs/cabinet${this.order.shebei}_${this.order.number}.gif`)
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      loading: false,
      error: '',
      paypal: null,
      order: null,
      tradeNo: '',
      second: 0,
      payMode: 'paypal'
    }
  },
  methods: {
    startTimer () {
      if (this.second === 0) {
        loadingTimer = setInterval(() => {
          this.second += 0.1
        }, 100)
      }
    },
    stopTimer () {
      clearInterval(loadingTimer)
      this.second = 0
    },
    onInput (val) {
      this.$emit('input', val)
    },
    onReload () {
      if (this.tradeNo) {
        this.checkOrder(this.tradeNo)
      } else {
        this.onPayExec()
      }
    },
    checkOrder (tradeNo) {
      this.startTimer()
      this.tradeNo = tradeNo
      this.loading = true
      this.$post(
        `${ORDER_CHECK}/${tradeNo}/stripe`,
        {},
        resp => {
          this.loading = false
          this.error = ''
          console.log('Order Data', resp.data)
          this.stopTimer()
          this.order = resp
        },
        error => {
          if (error === '正在请求中') {
            setTimeout(() => {
              this.checkOrder(tradeNo)
            }, 1000)
          } else {
            this.stopTimer()
            this.loading = false
            // this.error = error
            console.log(error)
          }
        }
      )
    }
  },
  created () {
    console.log('result route:', this.$route.query)
    let { paymentId, token, PayerID, tradeNo, payMode } = this.$route.query
    this.payMode = payMode
    if (tradeNo) {
      this.checkOrder(tradeNo)
    } else {
      this.paypal = {
        paymentId,
        token,
        payerId: PayerID
      }
    }
  }
}
</script>

<style lang="less">
.result-modal-head{
  padding: 40px 32px;
  height: 70px;
  display: flex;
  align-items: center;
}
.result-modal-warp{
  overflow-y: scroll;
}
.result-modal-head img{
  width: 56px;
  height: 56px;
}
.result-modal-head div{
  padding-left: 10px;
}
.result-modal-cabinet{
  padding-bottom: 32px;
  width: 100%;
  text-align: center;
  background: #FFFFFF;
}
.result-modal-cabinet img{
  width: 360px;
  margin: 0 auto;
  height: 360px;
}
.result-modal-info {
  // background: rgba(255,255,255,1);
  // background-img: url(../../static/imgs/card_bg.png);
  // background-size: 100% 100%;
  background: rgba(255,255,255,1);
    padding: 0 32px;
  &-warp{
    box-shadow: 0px 2px 16px 0px rgba(153,153,153,0.32);
    border-radius: 24px;
    padding: 32px 32px 0;
    word-break: normal;
  }
  & .title{
    font-size: 36px;
    font-weight: 500;
    color: rgba(52,125,255,1);
    padding: 8px 0;
  }
  & .desc{
    font-size: 28px;
    font-weight: 400;
    color: rgba(102,102,102,1);
  }
}
.result-modal-btn{
  display: flex;
  padding: 40px 16px;
}
.result-modal-btn .help-btn{
  flex: 1;
  height: 80px;
  line-height: 80px;
  border-radius: 48px;
  text-align: center;
  border: 2px solid rgba(52,125,255,1);
  font-size: 28px;
  font-weight: 500;
  color: rgba(52,125,255,1);
  margin: 0 14px;
}
.result-modal-remark{
  font-size: 28px;
  padding: 40px 32px;
  color: rgba(102,102,102,1);
  & .highlight{
    font-size: 50px;
  }
}
.result-modal-remark .bold{
  font-size: 32px;
  color: rgba(51,51,51,1);
}
.result-modal-remark div{
  padding: 8px;
}
.result-loading{
  &.circle{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-warp{
    background: #FFFFFF;
    padding: 30px 0;
  }
  & span{
    position: absolute;
    font-size: 70px;
    color: #F13453;
  }
  &-tips{
    text-align: center;
    font-size: 28px;
    color: #347DFF;
  }
}
</style>
