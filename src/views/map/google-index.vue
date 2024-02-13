<template>
<page :title="i18n.title">
  <div class="google-map">
    <google-map
      :locationList="list"
      :latLng="latLng"
      @center="onCenter"
      @zoom="onZoom"
      @setItem="onSetItem"
      @onmap="show = false"/>
    <transition name="fade">
      <div v-if="item && show" class="shop-info">
        <div class="shop-info-head">
          <div class="shop-title">
            <h3>{{ item.shopName }}</h3>
            <!-- <h3>{{ item.shopName }}</h3><span :class="[item.infoStatus==='在线'? 'shop-tag-active':'','shop-tag']">{{ item.infoStatus }}</span> -->
          </div>
          <a @click="goDetail"><img src="@/assets/imgs/popup_btn_navigation.png" alt=""></a>
        </div>
        <div class="shop-info-content">
          <div class="shop-logo">
            <img v-if="item.shopBanner" :src="item.shopBanner" alt="">
            <img v-else src="../../assets/imgs/banner-home.jpg" alt="">
          </div>
          <div class="shop-detail">
            <div class="shop-time">
              <span class="time">
                <img src="../../assets/imgs/map.png" alt="">
                {{ item.shopAddress1 }}
              </span>
              <span class="time">
                <img src="../../assets/imgs/distance.png" alt="">
                {{item.distance}}
              </span>
              <span class="time">
                <img src="../../assets/imgs/icon_time.png" alt="">
                {{ item.shopTime }}
              </span>
            </div>
            <div class="shop-op">
              <span class="free-num">{{i18n.free}}：{{ item.freeNum }}</span>
              <span class="return-num">{{i18n.return}}：{{ Number(item.batteryNum) - Number(item.freeNum) }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</page>
</template>

<script>
import GoogleMap from './google-map.vue'
import { debounce } from '../../utils/index'
import { SHOP_LIST } from '../../apis/cabinet'
export default {
  components: {
    GoogleMap
  },
  data () {
    return {
      latLng: [22.631123, 113.820622],
      zoomLevel: '1',
      list: [],
      item: null,
      show: false
    }
  },
  computed: {
    i18n () {
      return this.$t('map')
    }
  },
  watch: {
    latLng () {
      this.lazyLoad(this)
    }
  },
  methods: {
    getNearbyShop () {
      this.$loading(true)
      this.$post(
        SHOP_LIST,
        {
          coordType: 'WGS－84',
          lat: this.latLng[0],
          lng: this.latLng[1],
          zoomLevel: this.zoomLevel
        },
        resp => {
          this.$loading(false)
          this.list = resp.list
        },
        error => {
          this.$loading(false)
          this.$toast(error)
        }
      )
    },
    onZoom (zoomLevel) {
      // console.log('zoom', zoomLevel)
      this.zoomLevel = zoomLevel
      this.lazyLoad(this)
    },
    lazyLoad: debounce((vm) => {
      vm.getNearbyShop()
    }, 500),
    onCenter (latLng) {
      this.latLng = latLng
      this.lazyLoad(this)
    },
    onSetItem (val) {
      this.item = val
      this.show = true
    },
    goDetail () {
      console.log('show detail')
      this.$router.push({ path: 'nearby_shop', query: this.item })
    }
  },
  created () {
    let latitude = this.$route.query.latitude
    let longitude = this.$route.query.longitude
    if (latitude && longitude) {
      this.latLng = [+latitude, +longitude]
    }
  },
  mounted () {
    // this.getNearbyShop()
  }
}
</script>

<style lang="less" scoped>
.google-map{
  width: 100%;
  height: calc(100vh - 45px);
  position: fixed;
  bottom: 0;
  overflow: hidden;
}
.shop-info {
  position: fixed;
  bottom: 0;
  top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
  z-index: 100;
  // height: 350px;
  width: 90%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background: #fff;
  padding-bottom: 30px;
  .shop-info-head {
    // width: 100%;
    display: flex;
    padding: 20px 20px 0 20px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    .shop-title {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
      h3 {
        padding: 0;
        margin: 0;
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
    img {
      width: 60px;
      height: 60px;
    }
  }
  .shop-info-content {
    display: flex;
    height: calc(100% - 49px);
    padding: 0px 20px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    .shop-logo {
      width: 200px;
      img {
        max-height: 180px;
        max-width: 200px;
      }
    }
    .shop-detail {
      height: 100%;
      margin-left: 14px;
      p {
        margin: 0;
        font-weight: 600;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;
      }
      .shop-time {
        margin: 15px 0;
        font-size: 22px;
        line-height: 30px;
        .time {
          padding: 4px 0;
          position: relative;
          padding-left: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            display: inline-block;
            width: 30px;
            height: 30px;
            margin-right: 8px;
          }
        }
        // .time::before {
        //   content: '';
        //   position: absolute;
        //   height: 25px;
        //   width: 2px;
        //   top: 10px;
        //   left: 0;
        //   background: #23a8f2;
        // }
      }
      .shop-op {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        .return-num {
          margin-left: 20px;
          padding: 5px 10px;
          // border: 1px solid #23aaf2;
          // border-radius: 10px;
          // color: #23aaf2;
        }
        .free-num {
          padding: 5px 10px;
          // border: 1px solid #8dd35f;
          // border-radius: 10px;
          // color: #8dd35f;
        }
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: height .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
}
.detailfade-enter-active, .detailfade-leave-active {
  transition: opacity .5s;
}
.detailfade-enter, .detailfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(#000, 0.5);
  z-index: 10000;
  overflow: hidden;
  .shop-content {
    height: 600px;
    width: 100%;
    position: absolute;
    z-index: 100;
    bottom: 0;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: 0 -5px 10px #9e9b9b;
    background: #fff;
    .shop-title {
      display: flex;
      flex-direction: column;
      padding: 20px;
      background: #fff;
      border-radius: 20px;
      .title-info {
        padding: 0 30px;
        p {
          margin: 0 0 10px 0;
        }
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
        .shop-time {
          h4 {
            margin: 20px 0;
            padding: 10px 0;
            border-bottom: 1px solid #cacdd1;
          }
        }
      }
      .shop-title-head {
        display: flex;
        flex-direction: row;
        align-items: center;
        h2 {
          margin: 10px 30px;
          padding: 20px 0;
          border-bottom: 1px solid #cacdd1;
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
    }
    .address-detail {
      p {
        margin: 0;
        text-align: left;
        padding: 0 30px;
      }
    }
  }
}
</style>
