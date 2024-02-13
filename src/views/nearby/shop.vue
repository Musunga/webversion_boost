<template>
<page :title="i18n.shop_title">
  <div class="shop-detail-wrap">
    <div class="shop-banner">
      <img v-if="item.shopBanner" :src="item.shopBanner" alt="">
      <img v-else src="../../assets/imgs/banner-home.jpg" alt="">
    </div>
    <div class="shop-content">
      <div class="shop-title">
        <h3>{{ item.shopName }}</h3><span :class="[item.infoStatus==='在线'? 'shop-tag-active':'','shop-tag']">{{ item.infoStatus }}</span>
      </div>
      <div class="address-detail">
        <div class="address-detail-item">
          <img src="@/assets/imgs/map.png" alt="">
          <span>{{ item.shopAddress1 }}</span>
        </div>
        <div class="address-detail-item">
          <img src="@/assets/imgs/distance.png" alt="">
          <span>{{ item.distance }}</span>
        </div>
        <div class="address-detail-item">
          <img src="@/assets/imgs/icon_time.png" alt="">
          <span>{{ item.shopTime }}</span>
        </div>
        <div class="shop-op">
          <span class="free-num">{{i18n.free}}：{{ item.freeNum }}</span>
          <span class="return-num">{{i18n.return}}：{{ Number(item.batteryNum) - Number(item.freeNum) }}</span>
        </div>
      </div>
      <div class="address-detail-btn">
        <div class="btn" @click="openMap">{{i18n.go_here}}</div>
      </div>
    </div>
  </div>
</page>
</template>
<script>
export default {
  computed: {
    i18n () {
      return this.$t('map')
    }
  },
  data () {
    return {
      title: '',
      item: null
    }
  },
  methods: {
    openMap () {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${this.item.latitude},${this.item.longitude}&travelmode=bicycling`)
    }
  },
  mounted () {
    this.item = this.$route.query
    console.log(this.item)
    this.title = this.item.shopName
  }
}
</script>
<style lang="less" scoped>
.shop-detail-wrap {
  margin: 24px;
  background:rgba(255,255,255,1);
  box-shadow: 0px 2px 16px 0px rgba(153,153,153,0.32);
  border-radius: 24px;
  padding: 24px;
}
.shop-banner {
  img {
    // height: 500px;
    width: 100%;
  }
}
.shop-content {
  .shop-title {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    h3 {
      margin: 10px 0;
    }
    .shop-tag {
      margin-left: 20px;
      font-size: 24px;
      padding: 5px 15px;
      border: 1px solid #cacdd1;
      border-radius: 10px;
    }
    .shop-tag-active {
      color: #8dd35f;
      border: 1px solid #8dd35f;
    }
  }
  .address-detail {
    .address-detail-item {
      color: #606266;
      display: flex;
      padding: 20px 10px;
      line-height: 40px;
      border-bottom: 1px solid #E4E7ED;
      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
    }
    .shop-op {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
      padding: 20px 10px;
      .return-num {
        margin-left: 20px;
        padding: 5px 10px;
        border: 1px solid #23aaf2;
        border-radius: 10px;
        color: #23aaf2;
      }
      .free-num {
        padding: 5px 10px;
        border: 1px solid #8dd35f;
        border-radius: 10px;
        color: #8dd35f;
      }
    }
  }
  .address-detail-btn {
    padding: 30px 10px;
  }
}
</style>
