<template>
  <div class="order-item-warp">
    <div class="order-item-main">
      <div v-if="typeMap[item.pZujie]=='Returned' " class="order-item-title" style="color: green;">{{typeMap[item.pZujie]}}</div>
      <p><span>{{i18n.order_number}}</span>{{item.pOrderid}}</p>
      <p><span>{{i18n.time_rented}}</span>{{item.pBorrowtime | dateFmt}}</p>
      <p><span>{{i18n.venue_rented}}</span>{{item.pShopName}}</p>
    </div>
    <div class="order-item-foot" v-if="!isZujie">
      <div>
        <img src="../../assets/imgs/icon_time.png" alt="">
        <span>{{item.pUseMins}} {{i18n.min}}</span>
      </div>
      <div>
        <img src="../../assets/imgs/icon_money.png" alt="">
        <span>{{item.pJiesuan}} {{currency}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['locale']),
    i18n () {
      return this.$t('order_item')
    },
    currency () {
      return this.item.pCurrency || this.locale.money
    },
    isZujie () {
      return this.item.pJiesuanid === 0 && (this.item.pZujie === 1 || this.item.pZujie === 4)
    }
  },
  data () {
    return {
      typeMap: {}
    }
  },
  created () {
    this.typeMap = {
      0: this.i18n.type_0,
      1: this.i18n.type_1,
      2: this.i18n.type_2,
      3: this.i18n.type_3,
      4: this.i18n.type_4,
      5: this.i18n.type_5
    }
  }
}
</script>

<style lang="less">
.order-item-warp + .order-item-warp {
  margin-top: 40px;
}
.order-item-warp {
  // background-color: #E9FFF2;
  padding: 0 24px;
  border-radius: 20px;
  color: #727070;
  font-size: 24px;
  line-height: 40px;
  // box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
  .order-item-main {
    padding: 40px 24px 1px;
    span {
      padding-right: 24px;
    }
  }
  .order-item-title {
    font-size: 32px;
    color: #444444;
  }
  .order-item-foot {
    display: flex;
    justify-content: flex-start;
    border-top: 2px dashed #707070;
    padding: 0 24px;
    div {
      height: 80px;
      width: 50%;
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    img {
      height: 40px;
      width: 40px;
      margin-right: 20px;
    }
  }
}
</style>
